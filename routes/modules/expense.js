const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//新增清單
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  return Record.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))

})

//編輯清單
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error('error'))

})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record.name = req.body.name
      record.date = req.body.date
      record.category = req.body.category
      record.amount = req.body.amount
      return record.save()
    })
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))
})


//刪除清單
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))

})



module.exports = router