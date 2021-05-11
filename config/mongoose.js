const mongoose = require('mongoose')
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
})

module.exports = db

