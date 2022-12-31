import foods from "../models/foods.js";
import path from 'path'
import fs from 'fs'

export const addFoods = (req, res) => {
  const name = req.body.name
  const price = req.body.price
  const poster = req.file.path

  const results = new foods({
    name,
    price,
    poster
  })

  results.save().then(result => {
    res.status(201).json({
      status: 'Success!',
      code: 201,
      message: `${req.body.name} has added`,
      data: result
    })
  }).catch(err => res.json({ message: 'Adding Failed', err: err.message }))
}

export const getFoods = (req, res) => {
  const page = parseInt(req.query.page) || 1
  const perpage = parseInt(req.query.perpage) || 3
  let totalfoods
  let totalpage

  foods.find()
    .countDocuments()
    .then(count => {
      totalfoods = count
      totalpage = Math.ceil(count / perpage)

      return foods.find()
        .skip((page - 1) * perpage)
        .limit(perpage)
    })
    .then(result => {
      res.status(200).json({
        status: 'Ok',
        code: 200,
        totalpage,
        totalfoods,
        current: page,
        data: result
      })
    }).catch(err => res.json({ message: 'Geting Failed', err: err.message }))
}

export const getOneFoods = (req, res) => {
  foods.findOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      status: 'Ok',
      code: 200,
      data: result
    })
  }).catch(err => res.json({ message: 'Geting Failed', err: err.message }))
}

export const updateOneFoods = (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const price = req.body.price
  const poster = req.file.path

  foods.findById(id)
    .then(result => {
      result.name = name
      result.price = price

      if (result.poster !== poster) {
        fs.unlinkSync(path.join(result.poster))
        result.poster = poster
      }

      result.save()
        .then(results => {
          res.status(201).json({
            status: 'Update Success',
            code: 201,
            message: `Data with name ${results.name} has been updated!`,
            data: results
          })
        })
        .catch(err => res.json({ message: 'Update Failed', err: err.message }))
    })
}

export const deleteFoods = (req, res) => {
  foods.findByIdAndRemove(req.params.id)
    .then(result => {
      fs.unlinkSync(path.join(result.poster))
      res.status(200).json({
        status: 'Delete Success',
        code: 200,
        message: `Data with name ${result.name} has been deleted!`
      })
    }).catch(err => res.json({ message: 'Delete Failed', err: err.message }))
}
