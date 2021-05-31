const express = require('express')
const router = express.Router()
const User = ('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', (req, res) => {
  return User.create(req.body)
    .then(res.redirect('/'))
    .catch(err => console.log('err'))
})

router.get('/register', (req, res) => {
  res.render('register')
})


router.post('/register', (req, res) => {
  res.render('register')
})

module.exports = router