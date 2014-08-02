var RoomModel, RoomsCollection, application, config;

application = require('application');

RoomModel = require('models/Room');

config = require('config');

RoomsCollection = Backbone.Collection.extend({
  model: RoomModel,
  url: "//" + config.server.domain + ":" + config.server.port + "/rooms",
  initialize: function() {
    return this.listenTo(application.vent, 'addRoom:create', this.onAddRoom);
  },
  onAddRoom: function(_arg) {
    var model;
    model = _arg.model;
    return this.create(model, {
      wait: true
    });
  }
});

module.exports = new RoomsCollection;
