const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  author: {
    type: 'String',
    required: [true, 'Author is required']
  },
  title: {
    type: 'String',
    required: [true, 'Title is required']
  },
  description: {
    type: 'String',
    required: [true, 'Description is required']
  },
  imageUrl: {
    type: 'String',
    required: [true, 'Image Url is required']
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
  comments: [{
    type: 'ObjectId',
    ref: 'Comment'
  }],
  usersLiked: [{
    type: 'ObjectId',
    ref: 'User'
  }],
  isDeleted: {
    type: 'Boolean',
    default: false
  },
})

module.exports = mongoose.model('Book', BookSchema)