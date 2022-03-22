const http = require('http');
const fs = require('fs')
const port = 3004

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {

    if (err) {
      res.writeHead('404')
      res.write('Page Not Found')
    } else {
      res.write(data)
    }

    res.end()
  })
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  const url = req.url
  switch (url) {
    case '/contact':
      renderHTML('./pages/contact.html', res)
      break;
    case '/about':
      renderHTML('./pages/about.html', res)
      break;
    default:
      renderHTML('./pages/home.html', res)
      break;
  }
})

server.listen(port, () => {
  console.log(`The server listening for ${port}`)
})