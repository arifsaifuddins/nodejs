const express = require('express');
const { getAll, postData } = require('../controllers/products.jsx');

const router = express.Router()

router.get('/getproduct', getAll)

router.post('/postproduct', postData)

module.exports = router
