const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-local')

const app = express()
const { User } = require('./models')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

require('./routes')(app)

require('mongoose')
  .connect('mongodb://localhost/userdb')
  .then(() => app.listen(3000))
  .catch(e => console.error(e))
