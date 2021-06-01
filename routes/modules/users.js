const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
})
)

router.get('/register', (req, res) => {
  res.render('register')
})


router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please complete the form.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'The passwords are consistent.' })
  }
  if (errors.length) {
    res.render('register', { name, email, password, confirmPassword, errors })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push('The email already exists')
      res.render('/users/register', { name, email, password, confirmPassword, errors })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })

})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout Successfully')
  res.redirect('/users/login')
})

module.exports = router