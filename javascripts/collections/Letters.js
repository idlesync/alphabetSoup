window.require.register("collections/Letters", function(require, module) {var LetterModel, LettersCollection, application, config;

application = require('application');

LetterModel = require('models/Letter');

config = require('config');

LettersCollection = Backbone.Collection.extend({
  model: LetterModel,
  url: function() {
    return "//" + config.server.domain + ":" + config.server.port + "/letters/" + this.roomId;
  },
  initialize: function(model, _arg) {
    this.roomId = _arg.roomId;
    this.listenTo(this, 'change', (function(_this) {
      return function(model, _arg1) {
        var noSync;
        noSync = _arg1.noSync;
        if (noSync) {
          return;
        }
        return application.vent.trigger('socket:setLetter', {
          roomId: _this.roomId,
          model: model
        });
      };
    })(this));
    return this.listenTo(application.vent, 'socket:putLetter', (function(_this) {
      return function(_arg1) {
        var id, letterModel, oldZIndex, posLeft, posTop, roomId, zIndex;
        roomId = _arg1.roomId, id = _arg1.id, posTop = _arg1.posTop, posLeft = _arg1.posLeft, zIndex = _arg1.zIndex;
        if (roomId !== _this.roomId) {
          return;
        }
        letterModel = _this.get(id);
        oldZIndex = letterModel.get('zIndex');
        _this.map(function(model) {
          var otherZIndex;
          otherZIndex = model.get('zIndex');
          if (otherZIndex > oldZIndex) {
            return model.set({
              'zIndex': otherZIndex - 1
            }, {
              noSync: true
            });
          }
        });
        return letterModel.set({
          posTop: posTop,
          posLeft: posLeft,
          zIndex: zIndex
        }, {
          noSync: true
        });
      };
    })(this));
  }
});

module.exports = LettersCollection;
});
