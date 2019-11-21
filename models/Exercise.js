const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  kcalHour: {
    type: Number,
    required: true
  }
})

module.exports = Exercise = mongoose.model('Exercise', exerciseSchema)
