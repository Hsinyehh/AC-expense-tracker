const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Expense Schema
const userSchema = new Schema({
  name: { type: String, },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createDateAt: { type: Date, required: true, default: Date.now }
})



//Export
module.exports = mongoose.model('User', userSchema)