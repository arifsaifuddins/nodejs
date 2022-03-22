// express
const express = require('express');
const ejsLayout = require('express-ejs-layouts')
const app = express();
const port = 3004

// pake ejs
app.set('view engine', 'ejs')

// pake ejs layout
app.use(ejsLayout)
// middleware
app.use(express.static('public'))
// encode req.body
app.use(express.urlencoded({ extended: true }))

// mongo
require('./utils/db'); // connection
const { MongoApp } = require('./model/contact')

// express validator
const {
  validationResult,
  body,
  check
} = require('express-validator');

// flasher
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// config flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 3000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

// layouts

// home 

app.get('/', (req, res) => {
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

// contact

app.get('/contact', async (req, res) => {

  const contacts = await MongoApp.find()

  res.render('contact', {
    title: 'Contact',
    layout: './layout/layout', // pake ejs layout
    contacts,
    edsuccess: req.flash('edit'),
    delsuccess: req.flash('delete') // dapat dari flash
  })
})

// about

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    layout: './layout/layout', // pake ejs layout
  })
})

// add

app.get('/contact/add', (req, res) => {
  res.render('add', {
    title: 'Add',
    layout: './layout/layout'
  })
})

// exc add

app.post('/contact',
  // sesuai name yang di add.ejs
  check('email', 'Email not valid').isEmail(),
  check('phone', 'Phone not valid in Indonesia').isMobilePhone('id-ID'),
  check('nama', 'Nama minimal 12 letter').isLength({ min: 3 }),
  body('nama').custom(async value => {
    const duplikasi = await MongoApp.findOne({ nama: value });

    if (duplikasi) {
      throw new Error('Nama sudah terdaftar!');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });

      res.render('add', {
        title: 'Add',
        layout: './layout/layout',
        errors: errors.array()
      })
    } else {
      // addContact(req.body);
      await MongoApp.insertMany(req.body)
      // res.redirect('/contact') // get response

      res.render('contact', {
        title: 'Contact',
        layout: './layout/layout',
        contacts: await MongoApp.find(),
        success: `${req.body.nama} baru saja ditambahkan!`,
      })
    }
  }
)

// delete

app.get('/contact/delete/:nama', async (req, res) => {
  const contact = await MongoApp.findOne({ nama: req.params.nama })

  if (!contact) {
    res.status(404)
    res.send('<h1>404</h1>')

  } else {
    await MongoApp.deleteOne({ nama: contact.nama })

    // flash
    req.flash('delete', `${contact.nama} berhasil dihapus!`)
    res.redirect('/contact');
  }
})

// edit

app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await MongoApp.findOne({ nama: req.params.nama })

  res.render('edit', {
    title: 'Edit',
    layout: './layout/layout',
    contact
  })
})

// update

app.post('/contact/update',
  // sesuai name yang di add.ejs
  check('email', 'Email not valid').isEmail(),
  check('phone', 'Phone not valid in Indonesia').isMobilePhone('id-ID'),
  check('nama', 'Nama minimal 12 letter').isLength({ min: 3 }),
  body('nama').custom(async (value, { req }) => {
    const duplikasi = await MongoApp.findOne({ nama: value })

    if (value !== req.body.old && duplikasi) {
      throw new Error('Nama sudah terdaftar!');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      res.render('edit', {
        title: 'Edit',
        layout: './layout/layout',
        errors: errors.array(),
        contact: req.body
      })
    } else {

      await MongoApp.updateOne(
        { nama: req.body.old },
        {
          $set: {
            nama: req.body.nama,
            phone: req.body.phone,
            email: req.body.email
          }
        });

      // flash
      req.flash('edit', `${req.body.nama} berhasil diubah!`)
      res.redirect('/contact') // get response
    }
  }
)

// detail

app.get('/contact/:nama', async (req, res) => {

  const contact = await MongoApp.findOne({ nama: req.params.nama })

  res.render('detail', {
    title: 'Contact',
    layout: './layout/layout', // pake ejs layout
    contact
  })
})

// product

app.get('/product', (req, res) => {
  res.render('product', {
    title: 'Product',
    layout: './layout/layout', // pake ejs layout
  })
})

// untuk request semuanya yang belum di get
app.use('/', (req, res) => {
  res.status('404')
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`mongoapp listening to http://127.0.0.1:${port}`)
})
