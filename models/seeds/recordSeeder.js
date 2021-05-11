const mongoose = require('mongoose')
const Record = require('../record')
const recordlist = require('./record.json')
const db = mongoose.connection


mongoose.connect('mongodb://localhost/Expense', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})


db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < recordlist.length; i++) {
    Record.create(recordlist[i])
  }
  console.log('done')
})