const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/category.json')



router.get('/', async (req, res) => {
  const userId = req.user._id
  let selectCategory = req.query.filter
  let selectMonth = req.query.filterByMon
  let totalAmount = 0
  let data


  //首頁篩選都要賦值為All
  if (!selectCategory) {
    selectCategory = "All"
  }
  if (!selectMonth) {
    selectMonth = "All"
  }


  //設定篩選物件
  let matchObject = { userId: userId }
  if (selectCategory !== "All") {
    matchObject = { ...matchObject, category: selectCategory }
  }
  if (selectMonth !== "All") {
    matchObject = { ...matchObject, month: selectMonth }
  }

  try {
    data = await Record.aggregate(
      [
        { $match: { ...matchObject } },
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
  //如果篩選到資料，就賦值給totalAmount；沒篩選到資料，totalAmount=0
  if (!(data == 0)) {
    totalAmount = data[0].total
  }


  return Record.find({
    ...matchObject
  })
    .lean()
    .then(records => res.render('index', { records: records, totalAmount: totalAmount, selectCategory: selectCategory, selectMonth: selectMonth, categoryList: categoryList }))
    .catch(error => console.error('filter find error'))


})


module.exports = router