const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Expense Schema
const expenseSchema = new Schema({
  name: { type: String, },
  category: { type: String, },
  date: { type: String, },
  amount: { type: Number, }
})

const Expense = mongoose.model('Expense', expenseSchema)

//Category Model
const cateSchema = new Schema({
  category: { type: String, },
  icon: { type: String },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const Category = mongoose.model('Category', cateSchema)

//total Amount Model
const totalAmouSchema = new Schema({
  totalAmount: { type: Number },
})

const totalAmount = mongoose.model('totalAmount', totalAmouSchema)

//Export
module.exports = {
  Expense: Expense,
  Category: Category,
  totalAmount: totalAmount
}