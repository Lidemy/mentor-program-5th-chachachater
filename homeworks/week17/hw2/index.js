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
  secret: 'keyboard cat',
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

app.get('/index', articleController.index, redirectBack)
// app.get('/register', userController.register)
// app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/handle_logout', userController.handleLogout, redirectIndex)
app.get('/article/:id', articleController.getArticle)
app.get('/about', articleController.about)
app.get('/all_articles/:page', articleController.getAllArticle, redirectBack)

app.get('/add_article', articleController.addArticle, redirectBack)
app.post('/add_article', articleController.handleAddArticle, redirectIndex)
app.get('/update_article/:id', articleController.updateArticle, redirectBack)
app.post('/update_article/:id', articleController.handleUpdateArticle, redirectIndex)
app.get('/admin_article/:page', articleController.manageArticle, redirectBack)
app.get('/delete_article/:id', articleController.handleDeleteArticle, redirectBack)
app.get('/recovery_article/:id', articleController.handleRecoveryArticle, redirectBack)

app.get('/admin_category', articleController.manageCategory, redirectBack)
app.get('/add_category', articleController.addCategory, redirectBack)
app.post('/add_category', articleController.handleAddCategory, redirectBack)
app.get('/update_category/:id', articleController.updateCategory, redirectBack)
app.post('/update_category/:id', articleController.handleUpdateCategory, redirectBack)

app.get('/delete_category/:id', articleController.handleDeleteCategory, redirectBack)
app.get('/recovery_category/:id', articleController.handleRecoveryCategory, redirectBack)

app.listen(port, () => {
  console.log('listening now...')
})
