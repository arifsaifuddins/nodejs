const {
  loadContact,
  detailContact,
  addContact,
  cekDuplikasi,
  updateContact,
  deleteContact
} = require('./utils/contacts')

// express validator
const {
  validationResult,
  body,
  check
} = require('express-validator');

// express
const express = require('express');
const ejsLayout = require('express-ejs-layouts')
const server = express()
const port = 3004

// flash message
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// config flash
server.use(cookieParser('secret'))
server.use(session({
  cookie: { maxAge: 3000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
server.use(flash())

// pake ejs
server.set('view engine', 'ejs')

// pake ejs layout
server.use(ejsLayout)
// middleware
server.use(express.static('public'))
// encode req.body
server.use(express.urlencoded({ extended: true }))

// midleware
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
      nama: 'Andi',
      email: 'Andi@mail.com'
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
    edsuccess: req.flash('edit'),
    delsuccess: req.flash('delete') // dapat dari flash
  })
})

// add
server.get('/contact/add', (req, res) => {
  res.render('add', {
    title: 'Add',
    layout: './layout/layout'
  })
})

// exc add
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

      res.render('contact', {
        title: 'Contact',
        layout: './layout/layout',
        contacts: loadContact(),
        success: `${req.body.nama} baru saja ditambahkan!`,
      })
    }
  }
)

// delete
server.get('/contact/delete/:nama', (req, res) => {
  const contact = detailContact(req.params.nama)

  if (!contact) {
    res.status(404)
    res.send('<h1>404</h1>')
  } else {
    deleteContact(contact.nama)

    // flash
    req.flash('delete', `${contact.nama} berhasil dihapus!`)
    res.redirect('/contact');
  }
})

// edit
server.get('/contact/edit/:nama', (req, res) => {
  const contact = detailContact(req.params.nama)

  res.render('edit', {
    title: 'Edit',
    layout: './layout/layout',
    contact
  })
})

// update
server.post('/contact/update',
  // sesuai name yang di add.ejs
  check('email', 'Email not valid').isEmail(),
  check('phone', 'Phone not valid in Indonesia').isMobilePhone('id-ID'),
  check('nama', 'Nama minimal 12 letter').isLength({ min: 3 }),
  body('nama').custom((value, { req }) => {
    const duplikasi = cekDuplikasi(value);

    if (value !== req.body.old && duplikasi) {
      throw new Error('Nama sudah terdaftar!');
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      res.render('edit', {
        title: 'Edit',
        layout: './layout/layout',
        errors: errors.array(),
        contact: req.body
      })
    } else {
      updateContact(req.body);

      // flash
      req.flash('edit', `${req.body.nama} berhasil diubah!`)
      res.redirect('/contact') // get response
    }
  }
)

// detail
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

// port
server.listen(port, () => {
  console.log(`this web listening to http://localhost:${port}`)
})