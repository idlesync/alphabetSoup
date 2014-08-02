Handlebars.registerHelper 'letterItem', (letterShapes, letterShadows) ->
  $div = $ '<div>'
  $div.addClass 'circle-letters' if @letterShapes is 'circles'
  $div.addClass 'box-shadowed-letters' if @letterShadows

  $span = $ '<span>'
  $span.addClass 'letter-item'
  $span.html 'a'

  $div.append $span

  $div[0].outerHTML
