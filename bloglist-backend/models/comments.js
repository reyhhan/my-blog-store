const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  blog :
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
commentSchema.plugin(uniqueValidator)

const Comment = mongoose.model('Comment',  commentSchema)

module.exports = Comment