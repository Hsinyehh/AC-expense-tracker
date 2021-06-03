const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')



router.post('/', async (req, res) => {

  const selectCategory = req.body.filter
  const selectMonth = req.body.filterByMon
  const userId = req.user._id
  let totalAmount = 0
  let data

  if (selectCategory == "All" && selectMonth == "All") {
    res.redirect('/')
  }

  else if (selectCategory !== "All" && selectMonth == "All") {
    try {
      data = await Record.aggregate(
        [
          { $match: { category: selectCategory, userId: userId } },
          {
            $group: {
              _id: 'null',
              total: {
                $sum: "$amount"

              }
            }
          }])

    }
    catch (error) { console.error('filter aggregate error') }
    //如果篩選到資料，就賦值給totalAmount；沒篩選到totalAmount=0
    if (!(data == 0)) {
      totalAmount = data[0].total
    }

    return Record.find({
      "category": { $regex: `${selectCategory}` }, userId
    })
      .lean()
      .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, selectMonth: selectMonth, categoryList: categoryList }))
      .catch(error => console.error('filter find error'))
  }

  else if (selectCategory == "All" && selectMonth !== "All") {
    try {
      data = await Record.aggregate(
        [
          { $match: { month: selectMonth, userId: userId } },
          {
            $group: {
              _id: 'null',
              total: {
                $sum: "$amount"

              }
            }
          }])

    }
    catch (error) { console.error('filter aggregate error') }
    if (!(data == 0)) {
      totalAmount = data[0].total
    }
    return Record.find({

      userId, "month": { $regex: `${selectMonth}` }

    })
      .lean()
      .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, selectMonth: selectMonth, categoryList: categoryList }))
      .catch(error => console.error('filter find error'))
  }

  else {
    try {
      data = await Record.aggregate(
        [
          { $match: { category: selectCategory, month: selectMonth, userId: userId } },
          {
            $group: {
              _id: 'null',
              total: {
                $sum: "$amount"

              }
            }
          }])

    }
    catch (error) { console.error('filter aggregate error') }

    if (!(data == 0)) {
      totalAmount = data[0].total
    }

    return Record.find({

      "category": { $regex: `${selectCategory}` }, userId, "month": { $regex: `${selectMonth}` }

    })
      .lean()
      .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, selectMonth: selectMonth, categoryList: categoryList }))
      .catch(error => console.error('filter find error'))

  }


})


module.exports = router