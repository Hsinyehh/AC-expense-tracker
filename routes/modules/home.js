const express = require('express')
const router = express.Router()
const Models = require('../../models/record')




router.get('/', (req, res) => {
  let totalAmount = 0
  Models.Expense.aggregate(
    [{
      $group: {
        _id: "null",
        total: {
          $sum: "$amount"
        }
      }
    }])
    .then(result => totalAmount = result[0].total)
    .catch(error => console.error('error'))

  Models.Expense.find()
    .lean()
    .then()
    .then(records => res.render('index', { records: records, totalAmount: totalAmount }))
    .catch(error => console.error('error'))

})


module.exports = router