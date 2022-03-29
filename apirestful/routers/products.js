const express = require('express');
const { getAll, postData } = require('../controllers/products.jsx');

const router = express.Router()

router.get('/product', getAll)

router.post('/home', postData)

module.exports = router
