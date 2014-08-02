var HomeContentView, application;

application = require('application');

HomeContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/homeContent.hbs'],
  regions: {
    addRoomRegion: '#add-room',
    listRoomsRegion: '#list-rooms'
  }
});

module.exports = HomeContentView;
