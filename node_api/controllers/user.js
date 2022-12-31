import user from '../models/user.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'

export const userRegister = async (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const pass = req.body.password

  const mail = await user.findOne({ email: req.body.email })
  if (mail) {
    return res.status(400).json({
      status: 'Register Failed!',
      code: 400,
      message: 'Email has exist'
    })
  }

  if (pass.length <= 3) {
    return res.status(400).json({
      status: 'Register Failed!',
      code: 400,
      message: 'Password must be longer than 3 characters'
    })
  }

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pass, salt)

  const auth = new user({
    username,
    email,
    password
  })

  await auth.save().then(result => {
    res.status(201).json({
      status: 'Register Success!',
      code: 200,
      data: result
    })
  }).catch(err => res.json({ message: 'Register Failed', error: err.message }))
}

export const userLogin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const userLog = await user.findOne({ email })
  if (userLog && password) {
    const login = await bcrypt.compare(password, userLog.password)
    const token = jsonwebtoken.sign({ _id: userLog._id }, process.env.SECRET_KEY)

    if (login) {
      return await user.findOne({ email: userLog.email }).then(result => {

        res.status(200).header('auth', token).json({
          status: 'Login Success!',
          code: 200,
          data: result,
          token
        })
      }).catch(err => res.json({ message: 'Login Failed', error: err.message }))
    } else {
      return res.status(400).json({
        status: 'Login Failed!',
        code: 400,
        message: 'Email/Password not found'
      })
    }
  } else {
    return res.status(400).json({
      status: 'Login Failed!',
      code: 400,
      message: 'Email/Password not found'
    })
  }

}