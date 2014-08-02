window.require.register("routers/home", function(require, module) {var BaseRouter, HomeRouter;

BaseRouter = require('routers/Base');

HomeRouter = BaseRouter.extend({
  controller: require('controllers/home'),
  appRoutes: {
    '': 'defaultRoute'
  }
});

module.exports = new HomeRouter;
});
