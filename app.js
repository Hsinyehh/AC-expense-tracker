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



app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})