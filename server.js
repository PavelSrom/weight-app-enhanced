const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')
const app = express()

mongoose
  .connect(config.get('mongoURI'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.log('Database not connected')
    console.log(err)
  })

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/me/profile', require('./routes/profile'))
app.use('/api/me/logs', require('./routes/logs'))
app.use('/api/exercises', require('./routes/exercises'))

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
