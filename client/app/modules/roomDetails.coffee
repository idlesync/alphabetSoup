application = require 'application'

application.module 'roomDetailsModule', ->
  @display = (region, model) ->
    RoomDetailsView = require 'views/RoomDetails'
    roomDetailsView = new RoomDetailsView {model}
    region.show roomDetailsView

    require 'modules/showLetters'
    application.showLettersModule.display roomDetailsView.lettersRegion, model.lettersCollection
