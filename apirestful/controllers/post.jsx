const { validationResult } = require("express-validator");

exports.postBlog = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = new Error('value salah')
    err.errorStatus = 400
    err.data = errors.array()

    throw err
  }

  const result = {
    message: 'posting success',
    data: {
      title,
      body,
      image: 'image.png',
      time: `${new Date().getTime()}`,
      author: 'Arief'
    }
  }

  res.status(200).json(result)
}