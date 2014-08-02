LetterSchema = Schema
  roomId: ObjectId
  character: String
  posTop: Number
  posLeft: Number
  zIndex: Number
  backgroundColor: String

LetterModel = mongoose.model 'Letter', LetterSchema
