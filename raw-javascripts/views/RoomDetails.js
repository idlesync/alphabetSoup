var RoomDetailsView, application;

application = require('application');

RoomDetailsView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/roomDetails.hbs'],
  regions: {
    lettersRegion: '#letters-container'
  }
});

module.exports = RoomDetailsView;
