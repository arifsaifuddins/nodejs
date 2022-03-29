const express = require('express');
const { register } = require('../controllers/auth.jsx');

const authRoute = express.Router()

authRoute.post('/register', register)

module.exports = authRoute
