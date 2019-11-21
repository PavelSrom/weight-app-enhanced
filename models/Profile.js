const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  desiredWeight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  kcalIntake: {
    type: Number,
    required: true
  },
  chosenExercise: {
    name: {
      type: String
    },
    kcalHour: {
      type: Number
    }
  }
})

module.exports = Profile = mongoose.model('Profile', profileSchema)
