var application;

application = require('application');

application.module('homeContentModule', function() {
  return this.display = function(region) {
    var homeContentView;
    homeContentView = new (require('views/HomeContent'));
    region.show(homeContentView);
    require('modules/addRoom');
    application.addRoomModule.display(homeContentView.addRoomRegion);
    require('modules/listRooms');
    return application.listRoomsModule.display(homeContentView.listRoomsRegion);
  };
});
