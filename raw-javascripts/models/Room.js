var RoomModel, application, config;

application = require('application');

config = require('config');

RoomModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    'name': 'Default Room Name',
    'letterShapes': 'circles',
    'letterShadows': true
  },
  url: "http://" + config.server.domain + ":" + config.server.port + "/rooms",
  initialize: function() {
    this.listenTo(this, 'change:id', this.setLettersCollection);
    if (this.get('_id') != null) {
      return this.setLettersCollection();
    }
  },
  setLettersCollection: function() {
    var roomId;
    roomId = this.get('_id');
    return this.lettersCollection = new (require('collections/Letters'))([], {
      roomId: roomId
    });
  }
});

module.exports = RoomModel;
