application = require 'application'
config = require 'config'

RoomModel = Backbone.Model.extend
  idAttribute: '_id'

  defaults:
    'name': 'Default Room Name'
    'letterShapes': 'circles'
    'letterShadows': true

  url: "http://#{config.server.domain}:#{config.server.port}/rooms"

  initialize: ->
    @listenTo this, 'change:id', @setLettersCollection

    @setLettersCollection() if @get('_id')?

  setLettersCollection: ->
    roomId = @get '_id'
    @lettersCollection = new (require 'collections/Letters')([], {roomId})

module.exports = RoomModel
