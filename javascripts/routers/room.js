window.require.register("routers/room", function(require, module) {var BaseRouter, RoomRouter;

BaseRouter = require('routers/Base');

RoomRouter = BaseRouter.extend({
  controller: require('controllers/room'),
  appRoutes: {
    'rooms/': 'listRoomsRoute',
    'rooms/:id/': 'viewRoomRoute'
  }
});

module.exports = new RoomRouter;
});
