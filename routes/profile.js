const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Profile = require('../models/Profile')
const auth = require('../middleware/auth')

// get logged user's profile
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userID })
    // returns 200 even if the user has no profile yet - on purpose
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err)
  }
})

// create a profile
router.post(
  '/',
  [
    auth,
    [
      check('desiredWeight', 'Please enter a valid number').isInt(),
      check('height', 'Please enter a valid number').isInt(),
      check('kcalIntake', 'Please enter a valid number').isInt()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const profile = await Profile.findOne({ user: req.userID })
      if (profile)
        return res.status(400).json({ msg: 'Profile already exists' })

      const newProfile = new Profile({ user: req.userID, ...req.body })
      await newProfile.save()

      return res.status(201).json(newProfile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json(err)
    }
  }
)

// update a profile
router.put('/', auth, async (req, res) => {
  const { desiredWeight, kcalIntake, chosenExercise } = req.body

  try {
    const targetProfile = await Profile.findOne({ user: req.userID })
    if (desiredWeight) targetProfile.desiredWeight = desiredWeight
    if (kcalIntake) targetProfile.kcalIntake = kcalIntake
    if (chosenExercise) targetProfile.chosenExercise = chosenExercise // this should be an object

    await targetProfile.save()

    return res.json(targetProfile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json(err)
  }
})

module.exports = router
