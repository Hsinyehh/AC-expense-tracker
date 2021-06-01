const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')




router.get('/', (req, res) => {
  let totalAmount = 0
  const userId = req.user._id
  const selectCategory = "All"
  Record.aggregate(
    [

      { $match: { userId: userId } },
      {
        $group: {
          _id: "null",
          total: {
            $sum: "$amount"
          }
        }
      }
    ])
    .then(result => totalAmount = result[0].total)
    .catch(error => console.error('home aggregate error'))

  Record.find({ userId })
    .lean()
    .then(records =>
      res.render('index', {
        records: records, totalAmount: totalAmount, selectCategory: selectCategory, categoryList: categoryList
      }))
    .catch(error => console.error('home find error'))

})




module.exports = router