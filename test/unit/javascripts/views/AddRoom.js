window.require.register("views/AddRoom", function(require, module) {var AddRoomView, RoomModel, application;

RoomModel = require('models/Room');

application = require('application');

AddRoomView = Backbone.Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/addRoom.hbs'],
  ui: {
    createBtn: '.btn',
    nameInput: '#roomName',
    letterShapes: '[name="letter-circles-or-squares"]:checked',
    letterShadows: '[name="letter-shadows"]:checked'
  },
  events: {
    'click @ui.createBtn': 'onCreateClick',
    'keypress @ui.roomName': 'onNameKeyup'
  },
  onNameKeyup: function($event) {
    if ($event.keyCode === 13) {
      return this.onCreateClick($event);
    }
  },
  onCreateClick: function($event) {
    var letterShadows, letterShapes, model, name;
    this.bindUIElements();
    $event.preventDefault();
    $event.stopPropagation();
    name = this.ui.nameInput.val();
    letterShapes = this.ui.letterShapes.val();
    letterShadows = !!this.ui.letterShadows.val();
    model = new RoomModel({
      name: name,
      letterShapes: letterShapes,
      letterShadows: letterShadows
    });
    if (name !== '') {
      application.vent.trigger('addRoom:create', {
        model: model
      });
    }
    return this.ui.nameInput.val('');
  }
});

module.exports = AddRoomView;
});
