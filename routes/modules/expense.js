const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


//新增清單
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const month = req.body.date.slice(5, 7)
  return Record.create({ ...req.body, month, userId })
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))

})

//編輯清單
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error('error'))

})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      record.month = req.body.date.slice(5, 7)
      return record.save()
    })
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))
})


//刪除清單
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))

})



module.exports = router