var ListRoomItemView, ListRoomsView, roomsCollection;

ListRoomItemView = require('views/ListRoomsItem');

roomsCollection = require('collections/rooms');

ListRoomsView = Backbone.Marionette.CompositeView.extend({
  childView: ListRoomItemView,
  childViewContainer: 'tbody',
  collection: roomsCollection,
  template: require('templates')(Handlebars)['app/templates/listRooms.hbs'],
  className: 'row list-rooms'
});

module.exports = ListRoomsView;
