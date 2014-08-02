window.require.register("views/ShowLetters", function(require, module) {var LetterView, ShowLettersView, roomsCollection;

LetterView = require('views/Letter');

roomsCollection = require('collections/rooms');

ShowLettersView = Backbone.Marionette.CollectionView.extend({
  childView: LetterView,
  className: 'letters-canvas',
  ui: {
    letterItems: '.letter-item'
  },
  onRender: function() {
    var roomModel;
    roomModel = roomsCollection.get(this.collection.roomId);
    if (roomModel.get('letterShadows')) {
      this.$el.addClass('box-shadowed-letters');
    }
    if (roomModel.get('letterShapes') === 'circles') {
      return this.$el.addClass('circle-letters');
    }
  }
});

module.exports = ShowLettersView;
});
