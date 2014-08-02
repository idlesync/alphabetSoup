window.require.register("views/ListRoomsItem", function(require, module) {var ListRoomsItemView, application;

application = require('application');

require('helpers/letterItemHelpers');

ListRoomsItemView = Backbone.Marionette.ItemView.extend({
  template: require('templates')(Handlebars)['app/templates/listRoomsItem.hbs'],
  tagName: 'tr'
});

module.exports = ListRoomsItemView;
});
