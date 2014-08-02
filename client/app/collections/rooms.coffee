application = require 'application'
RoomModel = require 'models/Room'
config = require 'config'

RoomsCollection = Backbone.Collection.extend
  model: RoomModel

  url: "//#{config.server.domain}:#{config.server.port}/rooms"

  initialize: ->
    @listenTo application.vent, 'addRoom:create', @onAddRoom

  onAddRoom: ({model}) ->
    @create model, wait: true

module.exports = new RoomsCollection
