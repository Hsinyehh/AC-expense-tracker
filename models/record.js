const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: { type: String, },
  category: { type: String, },
  date: { type: String, },
  amount: { type: Number, },
  totalAmount: { type: Number },
  icon: { type: String }

})

module.exports = mongoose.model('Record', expenseSchema)