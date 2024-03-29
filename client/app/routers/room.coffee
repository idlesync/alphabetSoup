BaseRouter = require 'routers/Base'

RoomRouter = BaseRouter.extend
  controller: require 'controllers/room'
  appRoutes:
    'rooms/': 'listRoomsRoute'
    'rooms/:id/': 'viewRoomRoute'

module.exports = new RoomRouter
