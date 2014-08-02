application = require 'application'
LetterModel = require 'models/Letter'
config = require 'config'

LettersCollection = Backbone.Collection.extend
  model: LetterModel

  url: ->
    "//#{config.server.domain}:#{config.server.port}/letters/#{@roomId}"

  initialize: (model, {@roomId}) ->
    @listenTo this, 'change', (model, {noSync}) =>
      return if noSync
      application.vent.trigger 'socket:setLetter', {@roomId, model}

    @listenTo application.vent, 'socket:putLetter', ({roomId, id, posTop, posLeft, zIndex}) =>
      return unless roomId is @roomId

      letterModel = @get id
      oldZIndex = letterModel.get 'zIndex'

      @map (model) ->
        otherZIndex = model.get 'zIndex'
        if otherZIndex > oldZIndex
          model.set {'zIndex': otherZIndex - 1}, {noSync: true}

      letterModel.set {posTop, posLeft, zIndex}, {noSync: true}

module.exports = LettersCollection
