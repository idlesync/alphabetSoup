BaseRouter = require 'routers/Base'

HomeRouter = BaseRouter.extend
  controller: require 'controllers/home'
  appRoutes:
    '': 'defaultRoute'

module.exports = new HomeRouter
