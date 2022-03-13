const express = require('express');
const server = express()
const ejsLayout = require('express-ejs-layouts')
const morgan = require('morgan');
const port = 3004

// pake ejs
server.set('view engine', 'ejs')

// pake ejs layout
server.use(ejsLayout)
// middleware
server.use(morgan('dev'))
server.use(express.static('public'))

server.use((req, res, next) => {
  console.log('Time : ', Date.now())
  // untuk lanjut
  next()
})

server.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Arief',
      email: 'arief@mail.com'
    },
    {
      nama: 'Aqom',
      email: 'aqom@mail.com'
    },
    {
      nama: 'Hemdi',
      email: 'hemdi@mail.com'
    },
  ]
  res.render('home', {
    title: 'Home',
    mahasiswa,
    layout: './layout/layout', // pake ejs layout
  })
})

server.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    nama: 'Arief Saifuddien',
    layout: './layout/layout', // pake ejs layout
  })
})

server.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    layout: './layout/layout', // pake ejs layout
  })
})

server.get('/product', (req, res) => {
  res.render('product', {
    title: 'Product',
    layout: './layout/layout', // pake ejs layout
  })
})

// untuk request semuanya yang belum di get
server.use('/', (req, res) => {
  res.status('404')
  res.send('<h1>404</h1>')
})

server.listen(port, () => {
  console.log(`this web listening to http://localhost:${port}`)
})