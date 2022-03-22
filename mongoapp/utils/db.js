const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/arief')

// // buat scheme model
// const MongoApp = mongoose.model('Mongoapp', {
//   nama: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String
//   }
// })

// // add 1 data
// const contact1 = new MongoApp({
//   nama: 'adiara',
//   phone: '0893621679',
//   email: 'adiara@mail.co'
// })

// contact1.save().then(res => console.log(res))