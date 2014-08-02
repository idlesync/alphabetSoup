LetterView = Backbone.Marionette.ItemView.extend
  template: require('templates')(Handlebars)['app/templates/letter.hbs']

  tagName: 'span'

  className: 'letter-item'

  modelEvents:
    'change': 'onModelChange'

  onRender: ->
    @$el.css
      top: "#{@model.get 'posTop'}px"
      left: "#{@model.get 'posLeft'}px"
      backgroundColor: @model.get 'backgroundColor'
      zIndex: @model.get 'zIndex'

    @$el.draggable
      containment: '.letters-canvas'
      start: => @onLetterDragStart.apply this, arguments
      stop: => @onLetterDragStop.apply this, arguments

  onLetterDragStart: ->
    zIndex = @model.collection.length

    @$el.css {zIndex}

  onLetterDragStop: ->
    posTop = parseInt @$el.css('top'), 10
    posLeft = parseInt @$el.css('left'), 10

    myZIndex = @model.get 'zIndex'

    @model.collection.map (model) -> # this should be moved out
      otherZIndex = model.get 'zIndex'
      if otherZIndex > myZIndex
        model.set {'zIndex': otherZIndex - 1}, {noSync: true}

    zIndex = @model.collection.length - 1

    @model.set {posTop, posLeft, zIndex}

  onModelChange: ->
    @$el.animate
      top: @model.get 'posTop'
      left: @model.get 'posLeft'

    @$el.css
      zIndex: @model.get 'zIndex'

module.exports = LetterView
