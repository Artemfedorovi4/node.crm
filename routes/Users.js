const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Empl = require('../models/Emploeers')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  // const today = new Date()
  const userData = {
    LOGIN: req.body.LOGIN,
    EMP_ID: req.body.EMP_ID,
    PASSWORD: req.body.PASSWORD
  }
  console.log('body: ' + req.body.LOGIN);
  User.findOne({
    where: {
      LOGIN: req.body.LOGIN
    }
  })
    .then(user => {
      if (!user) {
        // bcrypt.hash(req.body.PASSWORD, 10, (err, hash) => {
          userData.PASSWORD = req.body.PASSWORD
          User.create(userData)
            .then(user => {
              res.json({ status: user.LOGIN + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        // })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      LOGIN: req.body.LOGIN
    }
  })
    .then(user => {
      if (user) {
        if (req.body.password === user.password) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      LOGIN: decoded.LOGIN
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/emploeers', (req, res) => {
  Empl.findAll().then(emploeer => {
      res.json(emploeer)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users