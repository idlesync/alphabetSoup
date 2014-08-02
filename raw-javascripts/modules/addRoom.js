var application;

application = require('application');

application.module('addRoomModule', function() {
  return this.display = function(region) {
    return region.show(new (require('views/AddRoom')));
  };
});
