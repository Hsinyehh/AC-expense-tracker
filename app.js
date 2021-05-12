const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error('error'))

})

//新增清單
app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/expense', (req, res) => {
  return Record.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))

})

//編輯清單
app.get('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error('error'))

})

app.post('/expense/:id/edit', (req, res) => {
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
app.post('/expense/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => { res.redirect('/') })
    .catch(error => console.log('error'))

})





app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})