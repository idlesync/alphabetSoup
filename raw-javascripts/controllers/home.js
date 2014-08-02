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
