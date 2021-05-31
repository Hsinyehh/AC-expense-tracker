const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Expense Schema
const recordSchema = new Schema({
  name: { type: String, },
  category: { type: String, },
  date: { type: String, },
  amount: { type: Number, },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})


//Export
module.exports = mongoose.model('Record', recordSchema)