var application;

application = require('application');

application.module('roomDetailsModule', function() {
  return this.display = function(region, model) {
    var RoomDetailsView, roomDetailsView;
    RoomDetailsView = require('views/RoomDetails');
    roomDetailsView = new RoomDetailsView({
      model: model
    });
    region.show(roomDetailsView);
    require('modules/showLetters');
    return application.showLettersModule.display(roomDetailsView.lettersRegion, model.lettersCollection);
  };
});
