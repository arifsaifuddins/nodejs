const express = require('express');
const { body } = require('express-validator');
const { postBlog } = require('../controllers/post.jsx');

const postRoute = express.Router()

postRoute.post('/post',
  [
    body('title').isLength({ min: 10 }).withMessage('minimal 10 karakter'),

    body('body').isLength({ min: 15 }).withMessage('minimal 15 karakter')
  ],
  postBlog)

module.exports = postRoute
