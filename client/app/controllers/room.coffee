application = require 'application'
config = require 'config'

roomsCollection = require 'collections/rooms'

HomeController = Marionette.Controller.extend
  listRoomsRoute: ->
    require 'modules/listRooms'
    application.listRoomsModule.display application.contentRegion

  viewRoomRoute: (id) ->
    roomsCollection.fetch
      success: ->
        roomModel = roomsCollection.get id

        if roomModel?
          roomModel.lettersCollection.fetch
            success: ->
              require 'modules/roomDetails'
              application.roomDetailsModule.display application.contentRegion, roomModel
        else
          # room model not found, should display something on the page
          application.vent.trigger 'navigate:link', {href: ''}

module.exports = new HomeController
