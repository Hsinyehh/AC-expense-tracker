const mongoose = require('mongoose')
const Record = require('../record')
const db = mongoose.connection

const categorylist = [{
  categoryName: '家居物業',
  icon: '<i class="fas fa-home"></i>'
},
{
  categoryName: '交通出行',
  icon: '<i class="fas fa-shuttle-van"></i>'
},
{
  categoryName: '休閒娛樂',
  icon: '<i class="fas fa-grin-beam"></i>'
},
{
  categoryName: '餐飲食品',
  icon: '<i class="fas fa-utensils"></i>'
},
{
  categoryName: '其他',
  icon: '<i class="fas fa-pen"></i>'
}
]




db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < categorylist.length; i++) {
    Record.create(categorylist[i])
  }
  console.log('done')
})