application = require 'application'
config = require 'config'

socketIoAdapterInitializer = ->
  socket = io.connect "http://#{config.server.domain}:#{config.server.port}"

  # Basics
  socket.on 'connect', ->
    application.vent.trigger 'socket:connected'

  socket.on 'disconnect', ->
    application.vent.trigger 'socket:disconnected'

  socket.on 'error', (error) ->
    console.log 'socket error:', error

  # Set letter position
  application.vent.on 'socket:setLetter', ({roomId, model}) ->
    posTop = model.get 'posTop'
    posLeft = model.get 'posLeft'
    zIndex = model.get 'zIndex'
    id = model.get '_id'
    socket.emit 'setLetter', {roomId, id, posTop, posLeft, zIndex}

  socket.on 'putLetter', (letterData) ->
    application.vent.trigger 'socket:putLetter', letterData

module.exports = socketIoAdapterInitializer()
