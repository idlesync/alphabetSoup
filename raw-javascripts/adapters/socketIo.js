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
