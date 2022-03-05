const express = require('express');
const server = express()
const port = 3004

server.get('/', (req, res) => {
  // res.send('hello world')
  // res.json({
  //   nama: 'arief saifuddien',
  //   kuliah: 'islamic studies'
  // })
  res.sendFile('./pages/home.html', { root: __dirname })
})

server.get('/about', (req, res) => {
  res.sendFile('./pages/about.html', { root: __dirname })
})

server.get('/contact', (req, res) => {
  res.sendFile('./pages/contact.html', { root: __dirname })
})

server.get('/about/:id/:category', (req, res) => {
  // params
  res.send('hello about : ' + req.params.id + ', category : ' + req.params.category)
})

server.get('/contact', (req, res) => {
  res.sendFile('./pages/contact.html', { root: __dirname })

  // query
  res.send('hello about : ' + req.query.nama)
})

// untuk request semuanya yang belum di get
server.use('/', (req, res) => {
  res.status('404')
  res.send('<h1>404</h1>')
})

server.listen(port, () => {
  console.log(`this web listening to ${port}`)
})