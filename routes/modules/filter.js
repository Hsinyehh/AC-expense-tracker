const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')



/*router.post('/', (req, res) => {
  let totalAmount = 0
  const selectCategory = req.body.filter
  const userId = req.user._id
  if (selectCategory == "All") {
    res.redirect('/')
  }
  else {
    Record.aggregate(
      [
        { $match: { category: selectCategory, userId: userId } },
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
      .catch(error => console.error('filter aggregate error'))

    return Record.find({

      "category": { $regex: `${selectCategory}` }, userId

    })
      .lean()
      .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, categoryList: categoryList }))
      .catch(error => console.error('filter find error'))
  }
})*/


router.post('/', async (req, res) => {

  const selectCategory = req.body.filter
  const userId = req.user._id
  if (selectCategory == "All") {
    res.redirect('/')
  }
  else {
    let data
    try {
      data = await Record.aggregate(
        [
          { $match: { category: selectCategory, userId: userId } },
          {
            $group: {
              _id: "null",
              total: {
                $sum: "$amount"

              }
            }
          }])
    }
    catch (error) { console.error('filter aggregate error') }
    let totalAmount = data[0].total

    return Record.find({

      "category": { $regex: `${selectCategory}` }, userId

    })
      .lean()
      .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, categoryList: categoryList }))
      .catch(error => console.error('filter find error'))
  }
})


module.exports = router