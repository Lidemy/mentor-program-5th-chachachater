const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const articleController = require('./controllers/article.js')
const userController = require('./controllers/user.js')

const app = express()
const port = process.env.PORT || 5001
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('trust proxy', 1)
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !true }
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin || false
  res.locals.errMessage = req.flash('errMessage') || null
  res.locals.username = req.session.username || null
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

function checkLogin(req, res, next) {
  if (!res.locals.isLogin) {
    res.end()
    next()
    return
  }
  next()
  return
}

app.get('/index', articleController.index, redirectBack)
// app.get('/register', userController.register)
// app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/handle-logout', userController.handleLogout, redirectIndex)
app.get('/article/:id', articleController.getArticle)
app.get('/about', articleController.about)
app.get('/all-articles/:page', articleController.getAllArticle, redirectBack)

app.get('/add-article', checkLogin, articleController.addArticle, redirectBack)
app.post('/add-article', checkLogin, articleController.handleAddArticle, redirectIndex)
app.get('/update-article/:id', checkLogin, articleController.updateArticle, redirectBack)
app.post('/update-article/:id', checkLogin, articleController.handleUpdateArticle, redirectIndex)
app.get('/admin-article/:page', checkLogin, articleController.manageArticle, redirectBack)
app.get('/delete-article/:id', checkLogin, articleController.handleDeleteArticle, redirectBack)
app.get('/recovery-article/:id', checkLogin, articleController.handleRecoveryArticle, redirectBack)

app.get('/admin-category', checkLogin, articleController.manageCategory, redirectBack)
app.get('/add-category', checkLogin, articleController.addCategory, redirectBack)
app.post('/add-category', checkLogin, checkLogin, articleController.handleAddCategory, redirectBack)
app.get('/update-category/:id', checkLogin, articleController.updateCategory, redirectBack)
app.post('/update-category/:id', checkLogin, articleController.handleUpdateCategory, redirectBack)

app.get('/delete-category/:id', checkLogin, articleController.handleDeleteCategory, redirectBack)
app.get('/recovery-category/:id', checkLogin, articleController.handleRecoveryCategory, redirectBack)

app.listen(port, () => {
  console.log('listening now...')
})
