express = require 'express'
app = express()
http = require('http').Server app
io = require('socket.io') http
bodyParser = require 'body-parser'
mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

port = process.env.PORT || 9191

rooms = []

mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/alphabetSoup'

mongoose.connect mongoUri

io.on 'connection', (socket) ->
  socket.on 'setLetter', ({roomId, id, posTop, posLeft, zIndex}) ->
    LetterModel.find {roomId}, (err, lettersList) ->
      LetterModel.findById id, (err, letterModel) ->
        letterModel.posTop = posTop
        letterModel.posLeft = posLeft

        oldZIndex = letterModel.zIndex

        for letterData in lettersList
          LetterModel.findById letterData._id, (err, letterItem) ->
            otherZIndex = letterItem.zIndex
            if otherZIndex > oldZIndex
              letterItem.zIndex -= 1
            letterItem.save()

        letterModel.zIndex = zIndex

        letterModel.save()

        io.emit 'putLetter', {roomId, id, posTop, posLeft, zIndex}

app.use bodyParser()

router = express.Router()

router.use (req, res, next) ->
  res.header 'Access-Control-Allow-Origin', '*'
  res.header 'Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'
  res.header 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'

  next()

# Rooms Routes
router.route '/rooms'
.get (req, res) ->
  RoomModel.find (err, rooms) ->
    res.json rooms
.post (req, res) ->
  name = req.body.name
  letterShapes = req.body.letterShapes
  letterShadows = req.body.letterShadows
  roomModel = new RoomModel {name, letterShapes, letterShadows}
  roomModel.buildLetters()
  roomModel.save ->
    res.json roomModel

router.route '/rooms/:roomId'
.get (req, res) ->
  roomId = req.params.roomId

  RoomModel.findById roomId, (err, room) ->
    res.json room
# End Rooms Routes

# Letters Routes
router.route '/letters/:roomId'
.get (req, res) ->
  roomId = req.params.roomId

  LetterModel.find {roomId}, (err, letters) ->
    res.json letters

# End Letters Routes

app.use router

http.listen port, '0.0.0.0', ->
  console.log "listening on 0.0.0.0:#{port}"
