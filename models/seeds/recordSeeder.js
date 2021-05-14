const db = require('../../config/mongoose')
const Models = require('../record')
const recordList = require('./record.json')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < recordList.length; i++) {
    Models.Expense.create(recordList[i])
  }
  console.log('done')
})