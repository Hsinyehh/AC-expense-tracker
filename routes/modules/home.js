const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')



router.get('/', async (req, res) => {

  const userId = req.user._id
  const selectCategory = "All"
  const selectMonth = "All"
  let data
  let totalAmount = 0

  try {
    data = await Record.aggregate(
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

  }
  catch (error) { console.error('home aggregate error') }
  if (!(data == 0)) {
    totalAmount = data[0].total
  }

  Record.find({ userId })
    .lean()
    .then(records =>
      res.render('index', {
        records: records, totalAmount: totalAmount, selectCategory: selectCategory, selectMonth: selectMonth, categoryList: categoryList
      }))
    .catch(error => console.error('home find error'))

})




module.exports = router