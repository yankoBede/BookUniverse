const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {
    type: 'String',
    required: [true, 'Comment content is required']
  },
  createdAt: {
    type: 'String',
    required: [true, 'Created at is required']
  },
  creator: {
    type: 'ObjectId',
    ref: 'User',
    required: [true, 'Creator is required']
  },
  book: {
    type: 'ObjectId',
    ref: 'Book',
    required: [true, 'Book is required']
  },
  isDeleted: {
    type: 'Boolean',
    default: false
  },
})

module.exports = mongoose.model('Comment', CommentSchema)