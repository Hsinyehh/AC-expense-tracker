const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')



require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: {
    eq: function (v1, v2) { return (v1 === v2) },
    getImage: function (category, categoryImage) {
      return categoryImage[category]
    }
  }
})
)
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))


usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)





app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})