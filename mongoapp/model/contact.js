const mongoose = require('mongoose');

// buat scheme model
const MongoApp = mongoose.model('Mongoapp', {
  nama: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

module.exports = { MongoApp }