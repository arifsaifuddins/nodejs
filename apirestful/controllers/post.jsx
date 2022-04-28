const { validationResult } = require("express-validator");
const blogPost = require("../models/blogPost");
const fs = require('fs');
const path = require('path');

// post blog

exports.postBlog = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const image = req.file.path;

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = new Error('value salah')
    err.errorStatus = 400
    err.data = errors.array()

    throw err
  }

  // const result = {
  //   message: 'posting success',
  //   data: {
  //     title,
  //     body,
  //     image: 'image.png',
  //     time: `${new Date().getTime()}`,
  //     author: 'Arief'
  //   }
  // }

  // res.status(200).json(result)

  // mongo
  const posting = new blogPost({
    title,
    body,
    image,
    author: {
      id: 1,
      name: 'arief'
    }
  })

  posting.save()
    .then((result) => {
      res.status(201).json({
        message: 'success',
        data: result
      })
    })
    .catch(err => console.log(err))
}

// get blog 

// exports.getBlog = (req, res) => {
//   blogPost.find().then(result => {
//     res.status(200).json({
//       message: 'getting success',
//       data: result
//     })
//   })
// }

// with pagination

exports.getBlog = (req, res) => {

  // query http://link.com?page=1&perpage=5
  const page = parseInt(req.query.page) || 1
  const perPage = parseInt(req.query.perpage) || 5
  let totalPost
  let totalPages

  blogPost
    .find()
    .countDocuments()
    .then(count => {
      totalPost = count
      totalPages = Math.ceil(count / perPage)

      return blogPost.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
      res.status(200).json({
        message: 'getting success',
        currentpage: page,
        perpage: perPage,
        totalpost: totalPost,
        totalpage: totalPages,
        data: result
      })
    })
}

exports.getOneBlog = (req, res) => {
  blogPost.findById(req.params.id).then(result => {
    res.status(200).json({
      message: 'getting oke',
      data: result
    })
  }).catch(error => {
    res.status(404).json({
      message: 'getting not oke',
      data: error
    })
  })
}

// update blog

exports.updateBlog = (req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = new Error('value salah')
    err.errorStatus = 400
    err.data = errors.array()

    throw err
  }

  const title = req.body.title;
  const body = req.body.body;
  const image = req.file.path;
  const id = req.params.id

  blogPost.findById(id).then(get => {

    get.title = title
    get.body = body
    get.image = image

    get.save().then((result) => {
      res.status(201).json({
        message: 'update success',
        data: result
      })
    })
  })
    .catch(err => next(err))
}

// delete 
exports.deleteBlog = (req, res, next) => {
  blogPost.findById(req.params.id).then(blog => {
    removeImageFile(blog.image)
    return blogPost.findByIdAndDelete(req.params.id)
  }).then(result => {
    res.status(200).json({
      message: 'delete success',
      data: result
    })
  }).catch(err => next(err))
}

const removeImageFile = (filePath) => {
  const file = path.join(__dirname + '/../' + filePath)

  fs.unlink(file, res => console.log('success', res))
}