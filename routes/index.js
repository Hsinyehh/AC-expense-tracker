const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const filter = require('./modules/filter')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


router.use('/users', users)
router.use('/expense', authenticator, expense)
router.use('/filter', authenticator, filter)
router.use('/', authenticator, home)


module.exports = router