application = require 'application'

application.module 'addRoomModule', ->
  @display = (region) ->
    region.show new (require 'views/AddRoom')
