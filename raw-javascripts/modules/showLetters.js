var application;

application = require('application');

application.module('showLettersModule', function() {
  return this.display = function(region, collection) {
    var ShowLettersView, showLettersView;
    ShowLettersView = require('views/ShowLetters');
    showLettersView = new ShowLettersView({
      collection: collection
    });
    return region.show(showLettersView);
  };
});
