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
    required: [true, 'Description is required'],
    maxlength: [50, 'Description must be up to 50 symbols long']
  },
  imageUrl: {
    type: 'String',
    required: [true, 'Image Url is required']
  },
  isPublic: {
    type: 'Boolean',
    default: false
  },
  createdAt: {
    type: 'String',
    required: [true, 'Created at is required']
  },
  creator: {
    type: 'ObjectId',
    ref: 'User'
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