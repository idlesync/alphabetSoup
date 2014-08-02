application = require 'application'

application.module 'showLettersModule', ->
  @display = (region, collection) ->
    ShowLettersView = require('views/ShowLetters')
    showLettersView = new ShowLettersView {collection}
    region.show showLettersView
