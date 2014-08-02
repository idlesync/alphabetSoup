application = require 'application'

application.module 'listRoomsModule', ->
  @display = (region) ->
    region.show new (require 'views/ListRooms')
