var HomeController, application, config, roomsCollection;

application = require('application');

config = require('config');

roomsCollection = require('collections/rooms');

HomeController = Marionette.Controller.extend({
  listRoomsRoute: function() {
    require('modules/listRooms');
    return application.listRoomsModule.display(application.contentRegion);
  },
  viewRoomRoute: function(id) {
    return roomsCollection.fetch({
      success: function() {
        var roomModel;
        roomModel = roomsCollection.get(id);
        if (roomModel != null) {
          return roomModel.lettersCollection.fetch({
            success: function() {
              require('modules/roomDetails');
              return application.roomDetailsModule.display(application.contentRegion, roomModel);
            }
          });
        } else {
          return application.vent.trigger('navigate:link', {
            href: ''
          });
        }
      }
    });
  }
});

module.exports = new HomeController;
