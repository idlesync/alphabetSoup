var LetterView;

LetterView = Backbone.Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/letter.hbs'],
  tagName: 'span',
  className: 'letter-item',
  modelEvents: {
    'change': 'onModelChange'
  },
  onRender: function() {
    this.$el.css({
      top: "" + (this.model.get('posTop')) + "px",
      left: "" + (this.model.get('posLeft')) + "px",
      backgroundColor: this.model.get('backgroundColor'),
      zIndex: this.model.get('zIndex')
    });
    return this.$el.draggable({
      containment: '.letters-canvas',
      start: (function(_this) {
        return function() {
          return _this.onLetterDragStart.apply(_this, arguments);
        };
      })(this),
      stop: (function(_this) {
        return function() {
          return _this.onLetterDragStop.apply(_this, arguments);
        };
      })(this)
    });
  },
  onLetterDragStart: function() {
    var zIndex;
    zIndex = this.model.collection.length;
    return this.$el.css({
      zIndex: zIndex
    });
  },
  onLetterDragStop: function() {
    var myZIndex, posLeft, posTop, zIndex;
    posTop = parseInt(this.$el.css('top'), 10);
    posLeft = parseInt(this.$el.css('left'), 10);
    myZIndex = this.model.get('zIndex');
    this.model.collection.map(function(model) {
      var otherZIndex;
      otherZIndex = model.get('zIndex');
      if (otherZIndex > myZIndex) {
        return model.set({
          'zIndex': otherZIndex - 1
        }, {
          noSync: true
        });
      }
    });
    zIndex = this.model.collection.length - 1;
    return this.model.set({
      posTop: posTop,
      posLeft: posLeft,
      zIndex: zIndex
    });
  },
  onModelChange: function() {
    this.$el.animate({
      top: this.model.get('posTop'),
      left: this.model.get('posLeft')
    });
    return this.$el.css({
      zIndex: this.model.get('zIndex')
    });
  }
});

module.exports = LetterView;
