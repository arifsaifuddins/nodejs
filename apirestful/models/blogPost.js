const mongoose = require("mongoose");

const blogPost = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  author: {
    type: Object,
    require: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('blogPost', blogPost)