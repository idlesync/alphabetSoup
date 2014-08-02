RoomModel = require 'models/Room'
application = require 'application'

AddRoomView = Backbone.Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/addRoom.hbs']

  ui:
    createBtn: '.btn'
    nameInput: '#roomName'
    letterShapes: '[name="letter-circles-or-squares"]:checked'
    letterShadows: '[name="letter-shadows"]:checked'

  events:
    'click @ui.createBtn': 'onCreateClick'
    'keypress @ui.roomName': 'onNameKeyup'

  onNameKeyup: ($event) ->
    if $event.keyCode is 13
      @onCreateClick $event

  onCreateClick: ($event) ->
    @bindUIElements() # not sure why this is needed

    $event.preventDefault()
    $event.stopPropagation()

    name = @ui.nameInput.val()
    letterShapes = @ui.letterShapes.val()
    letterShadows = !!@ui.letterShadows.val()
    model = new RoomModel {name, letterShapes, letterShadows}

    unless name is ''
      application.vent.trigger 'addRoom:create', {model}

    @ui.nameInput.val ''

module.exports = AddRoomView
