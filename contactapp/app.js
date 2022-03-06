const express = require('express');
const ejsLayout = require('express-ejs-layouts')
const {
  loadContact,
  detailContact,
  addContact,
  cekDuplikasi
} = require('./utils/contacts')
const {
  body,
  validationResult,
  check
} = require('express-validator');
const server = express()
const port = 3004

// pake ejs
server.set('view engine', 'ejs')

// pake ejs layout
server.use(ejsLayout)
// middleware
server.use(express.static('public'))
// encode req.body
server.use(express.urlencoded({ extended: true }))

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

server.get('/contact/add', (req, res) => {
  res.render('add', {
    title: 'Add',
    layout: './layout/layout'
  })
})

server.post('/contact',
  // sesuai name yang di add.ejs
  check('email', 'Email not valid').isEmail(),
  check('phone', 'Phone not valid in Indonesia').isMobilePhone('id-ID'),
  check('nama', 'Nama minimal 12 letter').isLength({ min: 3 }),
  body('nama').custom(value => {
    const duplikasi = cekDuplikasi(value);
    if (duplikasi) {
      throw new Error('Nama sudah terdaftar!');
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });

      res.render('add', {
        title: 'Add',
        layout: './layout/layout',
        errors: errors.array()
      })
    } else {
      addContact(req.body);
      // res.redirect('/contact') // get response

      const contacts = loadContact()

      res.render('contact', {
        title: 'Contact',
        layout: './layout/layout',
        contacts,
        success: `${req.body.nama} baru saja ditambahkan!`,
      })
    }
  }
)

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