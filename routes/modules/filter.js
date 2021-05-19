const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')



router.post('/', (req, res) => {
  let totalAmount = 0
  const selectCategory = req.body.filter
  if (selectCategory == "All") {
    res.redirect('/')
  }
  else {
    Record.aggregate(
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

    return Record.find({

      "category": { $regex: `${selectCategory}` }

    })
      .lean()
      .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, categoryList: categoryList }))
      .catch(error => console.error('error'))
  }
})


module.exports = router