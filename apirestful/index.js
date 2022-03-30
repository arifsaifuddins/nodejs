const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routers/auth');
const postRoute = require('./routers/post');
const mongoose = require('mongoose');
const app = express()

// body-parser (untuk mengirim req body)
app.use(bodyParser.json()) // json type

// const router = require('./routers/products');
// //midleware localhost:3004/v1/customer/request
// app.use('/v1/customer', router)
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