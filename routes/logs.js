const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Log = require('../models/Log')
const auth = require('../middleware/auth')

// get all user's logs
router.get('/', auth, async (req, res) => {
  try {
    const allLogs = await Log.find({ user: req.userID }).sort({ date: -1 })

    return res.json(allLogs)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err)
  }
})

// add a new log
router.post(
  '/',
  [
    auth,
    [
      check('weight', 'Please enter a valid weight').isFloat(),
      check('date', 'Date is required').isString()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const newLog = new Log({ user: req.userID, ...req.body })
      await newLog.save()

      const allLogs = await Log.find({ user: req.userID }).sort({ date: -1 })

      return res.status(201).json(allLogs)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json(err)
    }
  }
)

// update an existing log
router.put(
  '/:id',
  [auth, [check('weight', 'Please enter a valid weight').isFloat()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const newLog = await Log.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      if (!newLog)
        return res.status(404).json({ msg: 'Log with provided ID not found' })

      const allLogs = await Log.find({ user: req.userID }).sort({ date: -1 })

      return res.json(allLogs)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json(err)
    }
  }
)

module.exports = router
