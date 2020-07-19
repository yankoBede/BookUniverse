const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {
    type: 'String',
    required: [true, 'Comment content is required'],
  },
  creator: {
    type: 'ObjectId',
    ref: 'User'
  },
  book: {
    type: 'ObjectId',
    ref: 'Book'
  },
  isDeleted: {
    type: 'Boolean',
    default: false
  },
})

module.exports = mongoose.model('Comment', CommentSchema)