var application;

application = new Backbone.Marionette.Application();

application.addRegions({
  contentRegion: '#content'
});

application.addInitializer(function() {
  require('routers/room');
  require('routers/home');
  return require('adapters/socketIo');
});

application.addInitializer(function() {
  var roomsCollection;
  roomsCollection = require('collections/rooms');
  return roomsCollection.fetch();
});

module.exports = application;
