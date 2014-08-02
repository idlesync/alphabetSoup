RNG = require 'rng'

RoomSchema = Schema
  name: String
  letterShapes: String
  letterShadows: String

RoomSchema.methods.buildLetters = (seedOffset = 0) ->
  lettersList = []

  roomId = @_id

  zIndex = 0

  columns = 26
  rows = 5
  altRows = 2

  tileSize = 28
  padding = 14

  random = (seed) ->
    (new RNG(seed + seedOffset)).uniform()

  placeCharacters = (width, height, xOffset, yOffset, baseCode) ->
    for y in [0..height - 1]
      for x in [0..width - 1]
        posLeft = x * tileSize + padding + xOffset
        posTop = y * tileSize + padding + yOffset
        character = String.fromCharCode baseCode + x

        # move this to client?
        backgroundColor = (Math.round(0xFFFFFF * random(zIndex)).toString(16) + "000000").replace(/([a-f0-9]{6}).+/, "#$1")

        letterId = zIndex

        letterModel = new LetterModel {roomId, character, posTop, posLeft, zIndex, backgroundColor}

        letterModel.save()

        zIndex++

  placeCharacters columns, rows, 0, 0, 97 # a - z

  placeCharacters 10, altRows, 0, tileSize * rows, 48 # 0 - 9

  placeCharacters 5, altRows, 10 * tileSize, tileSize * rows, 60

  placeCharacters 6, altRows, 15 * tileSize, tileSize * rows, 33

  placeCharacters 5, altRows, 21 * tileSize, tileSize * rows, 40

  lettersList

RoomModel = mongoose.model 'Room', RoomSchema
