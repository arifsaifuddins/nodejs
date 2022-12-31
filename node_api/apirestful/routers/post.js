const express = require('express');
const { body } = require('express-validator');
const { postBlog, getBlog, getOneBlog, updateBlog, deleteBlog } = require('../controllers/post.jsx');

const postRoute = express.Router()

postRoute.post('/post',
  [
    body('title').isLength({ min: 10 }).withMessage('minimal 10 karakter'),
    body('body').isLength({ min: 15 }).withMessage('minimal 15 karakter')
  ],
  postBlog)

postRoute.get('/post', getBlog) // get all
postRoute.get('/post/:id', getOneBlog) // get one

postRoute.put('/post/:id',
  [
    body('title').isLength({ min: 10 }).withMessage('minimal 10 karakter'),
    body('body').isLength({ min: 15 }).withMessage('minimal 15 karakter')
  ],
  updateBlog)

postRoute.delete('/post/:id', deleteBlog)

module.exports = postRoute
