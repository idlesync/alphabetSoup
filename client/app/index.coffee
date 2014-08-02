application = require 'application'

application.on 'start', ->
  Backbone.history.start pushState: true

application.start()
