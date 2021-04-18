const express = require('express')
const app = express()
const cors = require('cors')
//
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Create a 'User'/'Exercise' Model
const Schema = mongoose.Schema

const toUTCString = (val) => new Date(val).toUTCString().split(' ').splice(0, 4).join(' ')

const exerciseSchema = new Schema(
  {
    description: String,
    duration: Number,
    date: { type: Date, get: toUTCString },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    toObject: { virtuals: true, getters: false },
    toJSON: { virtuals: false, getters: true },
    id: false
  }
)

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    log: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
  }
)

exerciseSchema.virtual('dateUTCString').get(() => toUTCString(this.date))

const Exercise = mongoose.model('Exercise', exerciseSchema)
const User = mongoose.model('ExerciseUser', userSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//1. I can create a user by posting form
app.post('/api/users', (req, res) => {
  const { username } = req.body
  const user = new User({ username })
  user.save((err, record) => {
    if (err) return res.json({ error: err.errmsg })
    res.json({ username: record.username, _id: record._id })
  })
})

//2. I can get an array of all users
app.get('/api/users', (req, res) => {
  User.find({}).select('username _id')
    .exec((err, record) => {
      if (err) return res.json({ err: err.errmsg })
      res.json(record)
    })
})

//3. I can add an exercise to any user by posting form
app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id: userId } = req.params
  const { description, duration, date } = req.body

  User.findById(userId, (err, user) => {
    if (err) res.json({ err: err.errmsg })

    const exercise = new Exercise({ description, duration, date: date, user: userId })
    exercise.save((err, recordEx) => {
      if (err) res.json({ err: err.errmsg })

      user.log.push(exercise._id)
      user.save((err, recordUser) => {
        if (err) res.json({ err: err.errmsg })

        const formatDate = date => new Date(date)
          .toString()
          .split(' ')
          .slice(0, 4)
          .join(' ');

        res.json({
          username: recordUser.username,
          description,
          duration: Number(duration),
          _id: userId,
          date: formatDate(date)
        })
      })
    })
  })
})

//4. I can retrieve a full exercise log of any user
app.get('/api/users/:_id/logs', (req, res) => {
  const { _id: userId } = req.params
  const { from, to, limit } = req.query

  // 5. I can retrieve part of the log of any user by also passing along optional parameters
  const limitOption = !isNaN(limit) ? { limit: parseInt(limit) } : {}
  let matchDate = {}
  const fromUTC = toUTCString(from)
  const toUTC = toUTCString(to)
  if (fromUTC !== 'Invalid Date' || toUTC !== 'Invalid Date') {
    matchDate = { date: {} }
  }
  if (fromUTC !== 'Invalid Date') matchDate['date']['$gte'] = from
  if (toUTC !== 'Invalid Date') matchDate['date']['$lte'] = to
  if ((fromUTC === 'Invalid Date' || toUTC === 'Invalid Date') || !(from <= to)) matchDate = {}

  //return res.json({userId, matchDate, limitOption});
  User
    .findById(userId)
    .select('username _id')
    .populate({
      path: 'log',
      match: { ...matchDate },
      select: 'description duration date -_id',
      options: { ...limitOption }
    })
    .exec((err, { _id, username, log }) => {
      if (err) res.json({ error: err.errmsg })
      res.json({ _id, username, log, count: log.length })
    })
})

app.get('/api/users/clear', function (req, res) {
  User.remove().exec((err, info) => {
    if (err) return res.json({ error: err.errmsg })

    Exercise.remove().exec((err, info) => {
      if (err) return res.json({ error: err.errmsg })
      res.json(info)
    })
  })
})

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: 'not found' })
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
