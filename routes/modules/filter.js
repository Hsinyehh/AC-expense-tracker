const express = require('express')
const router = express.Router()
const Models = require('../../models/record')



router.post('/', (req, res) => {
  console.log(req.body.filter)
  let totalAmount = 0

  Models.Expense.aggregate(
    [{
      $group: {
        _id: req.body.filter,
        total: {
          $sum: "$amount"
        }
      }
    }])
    .then(result => totalAmount = result[0].total)
    .catch(error => console.error('error'))

  return Models.Expense.find({

    "category": { $regex: `${req.body.filter}` }

  })
    .lean()
    .then(records => res.render('index', { records: records, totalAmount: totalAmount }))
    .catch(error => console.error('error'))

})


module.exports = router