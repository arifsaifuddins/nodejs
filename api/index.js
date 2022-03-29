const express = require('express');

const app = express()
const router = express.Router();



app.get('/', router)

const port = 3004
app.listen(port, () => {
  console.log(`server running as http://127.0.0.1:${port}`)
})