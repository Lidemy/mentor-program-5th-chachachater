const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const prizeController = require('./controllers/prize.js')
const userController = require('./controllers/user.js')
const app = express()
const port = process.env.PORT || 5001
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !true }
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin || false
  res.locals.errMessage = req.flash('errMessage') || null
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.static('./views'))
app.set('view engine', 'ejs')

function redirectBack (req, res) {
  res.redirect('back')
}
function redirectIndex(req, res) {
  res.redirect('/index')
}

// api
app.get('/api', prizeController.api)

// 後台系統
app.get('/index', prizeController.index, redirectBack)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.handleLogout, redirectIndex)
app.get('/admin', prizeController.managePrize, redirectBack)
app.post('/add_prize', prizeController.handleAddPrize, redirectBack)
app.post('/update_prize/:id', prizeController.handleUpdatePrize, redirectBack)
app.get('/delete_prize/:id', prizeController.handleDeletePrize, redirectBack)

app.listen(port, () => {
  console.log(`listening now...`)
})
