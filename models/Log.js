const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  weight: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

module.exports = Logs = mongoose.model('Log', logSchema)
