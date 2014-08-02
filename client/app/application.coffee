application = new Backbone.Marionette.Application()

application.addRegions
  contentRegion: '#content'

application.addInitializer ->
  require 'routers/room'
  require 'routers/home'

  require('adapters/socketIo')

application.addInitializer ->
  roomsCollection = require 'collections/rooms'

  roomsCollection.fetch()

module.exports = application
