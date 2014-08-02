LetterView = require 'views/Letter'
roomsCollection = require 'collections/rooms'

ShowLettersView = Backbone.Marionette.CollectionView.extend
  childView: LetterView

  className: 'letters-canvas'

  ui:
    letterItems: '.letter-item'

  onRender: ->
    roomModel = roomsCollection.get @collection.roomId

    if roomModel.get 'letterShadows'
      @$el.addClass 'box-shadowed-letters'

    if roomModel.get('letterShapes') is 'circles'
      @$el.addClass 'circle-letters'

module.exports = ShowLettersView
