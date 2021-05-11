const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error('error'))

})

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})