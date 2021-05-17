const express = require('express')
const router = express.Router()
const Models = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')



router.post('/', (req, res) => {
  //測試
  console.log(req.body.filter)
  let totalAmount = 0
  const selectCategory = req.body.filter

  Models.Expense.aggregate(
    [
      { $match: { category: selectCategory } },
      {
        $group: {
          _id: "null",
          total: {
            $sum: "$amount"

          }
        }
      }])
    .then(result =>
      totalAmount = result[0].total)
    .catch(error => console.error('error'))

  return Models.Expense.find({

    "category": { $regex: `${selectCategory}` }

  })
    .lean()
    .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, categoryList: categoryList }))
    .catch(error => console.error('error'))

})


module.exports = router