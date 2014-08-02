application = require 'application'

require 'collections/rooms' # this probably belongs somewhere else

HomeController = Marionette.Controller.extend
  defaultRoute: ->
    require 'modules/homeContent'
    application.homeContentModule.display application.contentRegion

module.exports = new HomeController
