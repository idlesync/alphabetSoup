LetterModel = Backbone.Model.extend
  idAttribute: '_id'

  defaults:
    posLeft: 0
    posTop: 0
    backgroundColor: '#dae8f2'
    zIndex: 0
    character: 'a'

module.exports = LetterModel
