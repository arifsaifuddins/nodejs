const express = require('express');

const bodyParser = require('body-parser');
const authRoute = require('./routers/auth');
const postRoute = require('./routers/post');

const mongoose = require('mongoose');
const multer = require('multer'); // buat file upload
const app = express()

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}


// body-parser (untuk mengirim req body) // multer (untuk file)
app.use(bodyParser.json()) // json type
app.use(multer({ storage, fileFilter }).single('image')) // sesuai nama skemanya

// access image
app.use('/images', express.static('images'))

// //midleware localhost:3004/v1/customer/request
const router = require('./routers/products');
app.use('/v1/customer', router)
// // app.use('/', router)

app.use('/v1/auth', authRoute)

app.use('/v1/blog', postRoute)

// validator
app.use((err, req, res, next) => {
  const status = err.errorStatus || 500
  const message = err.message
  const data = err.data

  res.status(status).json({ message, data })
})


// unlock CORS BLOCK di browser
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')

  next()
})

app.use('/', (req, res) => {
  res.send({
    message: 'Bad request',
    status: '404'
  })
})


// mongo connect
mongoose.connect('mongodb://127.0.0.1:27017/restapinode')
  .then((res) => console.log(res.options.autoIndex))
  .catch((err) => console.log('error : ', err))

const port = 3004;
app.listen(port, () => {
  console.log(`Server running as http://127.0.0.1:${port}`)
})