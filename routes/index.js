const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const filter = require('./modules/filter')


router.use('/', home)
router.use('/expense', expense)
router.use('/filter', filter)


module.exports = router