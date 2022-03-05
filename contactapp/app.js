const express = require('express');
const ejsLayout = require('express-ejs-layouts')
const { loadContact, detailContact } = require('./utils/contacts')
const server = express()
const port = 3004

// pake ejs
server.set('view engine', 'ejs')

// pake ejs layout
server.use(ejsLayout)
// middleware
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
    layout: './layout/layout', // pake ejs layout
  })
})

server.get('/contact', (req, res) => {

  const contacts = loadContact()

  res.render('contact', {
    title: 'Contact',
    layout: './layout/layout', // pake ejs layout
    contacts,
  })
})

server.get('/contact/:nama', (req, res) => {

  const contact = detailContact(req.params.nama)

  res.render('detail', {
    title: 'Contact',
    layout: './layout/layout', // pake ejs layout
    contact
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