window.require.register("helpers/letterItemHelpers", function(require, module) {Handlebars.registerHelper('letterItem', function(letterShapes, letterShadows) {
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
