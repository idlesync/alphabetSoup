window.require.register("modules/listRooms", function(require, module) {var application;

application = require('application');

application.module('listRoomsModule', function() {
  return this.display = function(region) {
    return region.show(new (require('views/ListRooms')));
  };
});
});