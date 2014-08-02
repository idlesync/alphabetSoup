window.require.register('adapters/socketIo', function(require, module) {
var application, config, socketIoAdapterInitializer;

application = require('application');

config = require('config');

socketIoAdapterInitializer = function() {
  var socket;
  socket = io.connect("http://" + config.server.domain + ":" + config.server.port);
  socket.on('connect', function() {
    return application.vent.trigger('socket:connected');
  });
  socket.on('disconnect', function() {
    return application.vent.trigger('socket:disconnected');
  });
  socket.on('error', function(error) {
    return console.log('socket error:', error);
  });
  application.vent.on('socket:setLetter', function(_arg) {
    var id, model, posLeft, posTop, roomId, zIndex;
    roomId = _arg.roomId, model = _arg.model;
    posTop = model.get('posTop');
    posLeft = model.get('posLeft');
    zIndex = model.get('zIndex');
    id = model.get('_id');
    return socket.emit('setLetter', {
      roomId: roomId,
      id: id,
      posTop: posTop,
      posLeft: posLeft,
      zIndex: zIndex
    });
  });
  return socket.on('putLetter', function(letterData) {
    return application.vent.trigger('socket:putLetter', letterData);
  });
};

module.exports = socketIoAdapterInitializer();

});

window.require.register('application', function(require, module) {
var application;

application = new Backbone.Marionette.Application();

application.addRegions({
  contentRegion: '#content'
});

application.addInitializer(function() {
  require('routers/room');
  require('routers/home');
  return require('adapters/socketIo');
});

application.addInitializer(function() {
  var roomsCollection;
  roomsCollection = require('collections/rooms');
  return roomsCollection.fetch();
});

module.exports = application;

});

window.require.register('collections/Letters', function(require, module) {
var LetterModel, LettersCollection, application, config;

application = require('application');

LetterModel = require('models/Letter');

config = require('config');

LettersCollection = Backbone.Collection.extend({
  model: LetterModel,
  url: function() {
    return "//" + config.server.domain + ":" + config.server.port + "/letters/" + this.roomId;
  },
  initialize: function(model, _arg) {
    var _this = this;
    this.roomId = _arg.roomId;
    this.listenTo(this, 'change', function(model, _arg1) {
      var noSync;
      noSync = _arg1.noSync;
      if (noSync) {
        return;
      }
      return application.vent.trigger('socket:setLetter', {
        roomId: _this.roomId,
        model: model
      });
    });
    return this.listenTo(application.vent, 'socket:putLetter', function(_arg1) {
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
    });
  }
});

module.exports = LettersCollection;

});

window.require.register('collections/rooms', function(require, module) {
var RoomModel, RoomsCollection, application, config;

application = require('application');

RoomModel = require('models/Room');

config = require('config');

RoomsCollection = Backbone.Collection.extend({
  model: RoomModel,
  url: "//" + config.server.domain + ":" + config.server.port + "/rooms",
  initialize: function() {
    return this.listenTo(application.vent, 'addRoom:create', this.onAddRoom);
  },
  onAddRoom: function(_arg) {
    var model;
    model = _arg.model;
    return this.create(model, {
      wait: true
    });
  }
});

module.exports = new RoomsCollection;

});

window.require.register('config', function(require, module) {
var config;

config = {
  server: {
    domain: '104.131.212.90',
    port: 9191
  }
};

module.exports = config;

});

window.require.register('controllers/home', function(require, module) {
var HomeController, application;

application = require('application');

require('collections/rooms');

HomeController = Marionette.Controller.extend({
  defaultRoute: function() {
    require('modules/homeContent');
    return application.homeContentModule.display(application.contentRegion);
  }
});

module.exports = new HomeController;

});

window.require.register('controllers/room', function(require, module) {
var HomeController, application, config, roomsCollection;

application = require('application');

config = require('config');

roomsCollection = require('collections/rooms');

HomeController = Marionette.Controller.extend({
  listRoomsRoute: function() {
    require('modules/listRooms');
    return application.listRoomsModule.display(application.contentRegion);
  },
  viewRoomRoute: function(id) {
    return roomsCollection.fetch({
      success: function() {
        var roomModel;
        roomModel = roomsCollection.get(id);
        if (roomModel != null) {
          return roomModel.lettersCollection.fetch({
            success: function() {
              require('modules/roomDetails');
              return application.roomDetailsModule.display(application.contentRegion, roomModel);
            }
          });
        } else {
          return application.vent.trigger('navigate:link', {
            href: ''
          });
        }
      }
    });
  }
});

module.exports = new HomeController;

});

window.require.register('helpers/letterItemHelpers', function(require, module) {

Handlebars.registerHelper('letterItem', function(letterShapes, letterShadows) {
  var $div, $span;
  $div = $('<div>');
  if (this.letterShapes === 'circles') {
    $div.addClass('circle-letters');
  }
  if (this.letterShadows) {
    $div.addClass('box-shadowed-letters');
  }
  $span = $('<span>');
  $span.addClass('letter-item');
  $span.html('a');
  $div.append($span);
  return $div[0].outerHTML;
});

});

window.require.register('index', function(require, module) {
var application;

application = require('application');

application.on('start', function() {
  return Backbone.history.start({
    pushState: true
  });
});

application.start();

});

window.require.register('models/Letter', function(require, module) {
var LetterModel;

LetterModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    posLeft: 0,
    posTop: 0,
    backgroundColor: '#dae8f2',
    zIndex: 0,
    character: 'a'
  }
});

module.exports = LetterModel;

});

window.require.register('models/Room', function(require, module) {
var RoomModel, application, config;

application = require('application');

config = require('config');

RoomModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    'name': 'Default Room Name',
    'letterShapes': 'circles',
    'letterShadows': true
  },
  url: "http://" + config.server.domain + ":" + config.server.port + "/rooms",
  initialize: function() {
    this.listenTo(this, 'change:id', this.setLettersCollection);
    if (this.get('_id') != null) {
      return this.setLettersCollection();
    }
  },
  setLettersCollection: function() {
    var roomId;
    roomId = this.get('_id');
    return this.lettersCollection = new (require('collections/Letters'))([], {
      roomId: roomId
    });
  }
});

module.exports = RoomModel;

});

window.require.register('modules/addRoom', function(require, module) {
var application;

application = require('application');

application.module('addRoomModule', function() {
  return this.display = function(region) {
    return region.show(new (require('views/AddRoom')));
  };
});

});

window.require.register('modules/homeContent', function(require, module) {
var application;

application = require('application');

application.module('homeContentModule', function() {
  return this.display = function(region) {
    var homeContentView;
    homeContentView = new (require('views/HomeContent'));
    region.show(homeContentView);
    require('modules/addRoom');
    application.addRoomModule.display(homeContentView.addRoomRegion);
    require('modules/listRooms');
    return application.listRoomsModule.display(homeContentView.listRoomsRegion);
  };
});

});

window.require.register('modules/listRooms', function(require, module) {
var application;

application = require('application');

application.module('listRoomsModule', function() {
  return this.display = function(region) {
    return region.show(new (require('views/ListRooms')));
  };
});

});

window.require.register('modules/roomDetails', function(require, module) {
var application;

application = require('application');

application.module('roomDetailsModule', function() {
  return this.display = function(region, model) {
    var RoomDetailsView, roomDetailsView;
    RoomDetailsView = require('views/RoomDetails');
    roomDetailsView = new RoomDetailsView({
      model: model
    });
    region.show(roomDetailsView);
    require('modules/showLetters');
    return application.showLettersModule.display(roomDetailsView.lettersRegion, model.lettersCollection);
  };
});

});

window.require.register('modules/showLetters', function(require, module) {
var application;

application = require('application');

application.module('showLettersModule', function() {
  return this.display = function(region, collection) {
    var ShowLettersView, showLettersView;
    ShowLettersView = require('views/ShowLetters');
    showLettersView = new ShowLettersView({
      collection: collection
    });
    return region.show(showLettersView);
  };
});

});

window.require.register('routers/Base', function(require, module) {
var BaseRouter, application;

application = require('application');

BaseRouter = Marionette.AppRouter.extend({
  initialize: function() {
    return this.listenTo(application.vent, 'navigate:link', this.onNavigateLink);
  },
  onNavigateLink: function(_arg) {
    var href;
    href = _arg.href;
    return this.navigate(href, {
      trigger: true
    });
  }
});

module.exports = BaseRouter;

});

window.require.register('routers/home', function(require, module) {
var BaseRouter, HomeRouter;

BaseRouter = require('routers/Base');

HomeRouter = BaseRouter.extend({
  controller: require('controllers/home'),
  appRoutes: {
    '': 'defaultRoute'
  }
});

module.exports = new HomeRouter;

});

window.require.register('routers/room', function(require, module) {
var BaseRouter, RoomRouter;

BaseRouter = require('routers/Base');

RoomRouter = BaseRouter.extend({
  controller: require('controllers/room'),
  appRoutes: {
    'rooms/': 'listRoomsRoute',
    'rooms/:id/': 'viewRoomRoute'
  }
});

module.exports = new RoomRouter;

});

window.require.register('views/AddRoom', function(require, module) {
var AddRoomView, RoomModel, application;

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

window.require.register('views/HomeContent', function(require, module) {
var HomeContentView, application;

application = require('application');

HomeContentView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/homeContent.hbs'],
  regions: {
    addRoomRegion: '#add-room',
    listRoomsRegion: '#list-rooms'
  }
});

module.exports = HomeContentView;

});

window.require.register('views/Letter', function(require, module) {
var LetterView;

LetterView = Backbone.Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/letter.hbs'],
  tagName: 'span',
  className: 'letter-item',
  modelEvents: {
    'change': 'onModelChange'
  },
  onRender: function() {
    var _this = this;
    this.$el.css({
      top: "" + (this.model.get('posTop')) + "px",
      left: "" + (this.model.get('posLeft')) + "px",
      backgroundColor: this.model.get('backgroundColor'),
      zIndex: this.model.get('zIndex')
    });
    return this.$el.draggable({
      containment: '.letters-canvas',
      start: function() {
        return _this.onLetterDragStart.apply(_this, arguments);
      },
      stop: function() {
        return _this.onLetterDragStop.apply(_this, arguments);
      }
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

});

window.require.register('views/ListRooms', function(require, module) {
var ListRoomItemView, ListRoomsView, roomsCollection;

ListRoomItemView = require('views/ListRoomsItem');

roomsCollection = require('collections/rooms');

ListRoomsView = Backbone.Marionette.CompositeView.extend({
  childView: ListRoomItemView,
  childViewContainer: 'tbody',
  collection: roomsCollection,
  template: require('templates')(Handlebars)['app/templates/listRooms.hbs'],
  className: 'row list-rooms'
});

module.exports = ListRoomsView;

});

window.require.register('views/ListRoomsItem', function(require, module) {
var ListRoomsItemView, application;

application = require('application');

require('helpers/letterItemHelpers');

ListRoomsItemView = Backbone.Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/listRoomsItem.hbs'],
  tagName: 'tr'
});

module.exports = ListRoomsItemView;

});

window.require.register('views/RoomDetails', function(require, module) {
var RoomDetailsView, application;

application = require('application');

RoomDetailsView = Backbone.Marionette.LayoutView.extend({
  template: require('templates')(Handlebars)['app/templates/roomDetails.hbs'],
  regions: {
    lettersRegion: '#letters-container'
  }
});

module.exports = RoomDetailsView;

});

window.require.register('views/ShowLetters', function(require, module) {
var LetterView, ShowLettersView, roomsCollection;

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
