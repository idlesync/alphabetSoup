application = require 'application'

application.module 'homeContentModule', ->
  @display = (region) ->
    homeContentView = new (require 'views/HomeContent')
    region.show homeContentView

    require 'modules/addRoom'
    application.addRoomModule.display homeContentView.addRoomRegion

    require 'modules/listRooms'
    application.listRoomsModule.display homeContentView.listRoomsRegion
