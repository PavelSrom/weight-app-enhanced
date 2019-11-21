const router = require('express').Router()
const Exercise = require('../models/Exercise')
const auth = require('../middleware/auth')

// get all exercises
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find()

    return res.json(exercises)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err)
  }
})

module.exports = router
