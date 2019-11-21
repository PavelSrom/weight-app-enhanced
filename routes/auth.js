const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const User = require('../models/User')

// get authenticated user's credentials
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userID).select('-password')
    if (!user) return res.status(404).json({ msg: 'User not found' })

    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err)
  }
})

// register user in the system
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Must be a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const userExists = await User.findOne({ email })
      if (userExists)
        return res.status(400).json({ msg: 'Provided email is already taken' })

      const user = new User(req.body)
      user.password = await bcrypt.hash(password, 8)

      await user.save()

      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })

      return res.status(201).json({ token })
    } catch (err) {
      console.error(err.message)
      return res.status(500).json(err)
    }
  }
)

// login user to their account
router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ msg: 'Email does not exist' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' })

      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), {
        expiresIn: 3600
      })

      return res.json({ token })
    } catch (err) {
      console.error(err.message)
      return res.status(500).json(err)
    }
  }
)

module.exports = router
