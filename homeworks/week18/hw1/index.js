const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const fetch = require('node-fetch')
const multer = require('multer')
const FormData = require('form-data')
const restaurantController = require('./controllers/restaurant.js')
const userController = require('./controllers/user.js')
const drawController = require('./controllers/draw.js')

const ejs = require('ejs')
const app = express()
const port = process.env.PORT || 5001

const upload = new multer({
  limits: {
    fileSize: 1054576, // bytes, equal to 1 MB
    files: 1,
    parts: 5
  }
})
app.set('view engine', 'ejs')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET,
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
app.use(express.static('./views'))

function redirectBack (req, res, next) {
  res.redirect('back')
  next()
  return
}
function checkLogin(req, res, next) {
  if (!res.locals.isLogin) return res.end()
  next()
  return
}

app.get('/index', (req, res, next) => {
  res.render('index.ejs')
})
app.get('/faq', restaurantController.faq, redirectBack)
app.get('/menu', restaurantController.menu, redirectBack)

app.get('/admin-faq', checkLogin, restaurantController.manageFaq, redirectBack)
app.post('/add-faq', checkLogin, upload.single(), restaurantController.handleAddFaq, redirectBack)
app.post('/update-faq/:id', checkLogin, upload.single(), restaurantController.handleUpdateFaq, redirectBack)
app.get('/delete-faq/:id', checkLogin, restaurantController.handleDeleteFaq, redirectBack)

app.get('/admin-item', checkLogin, restaurantController.manageItem, redirectBack)
app.post('/add-item', checkLogin, upload.single('image'), restaurantController.handleAddItem, redirectBack)
app.post('/update-item/:id', checkLogin, upload.single('image'), restaurantController.handleUpdateItem, redirectBack)
app.get('/delete-item/:id', checkLogin, restaurantController.handleDeleteItem, redirectBack)

app.get('/register', userController.register, redirectBack)
app.post('/register', upload.single(), userController.handleRegister, redirectBack)
app.get('/login', userController.login, redirectBack)
app.post('/login', upload.single(), userController.handleLogin, redirectBack)
app.get('/logout', userController.handleLogout)

app.get('/draw', drawController.draw, redirectBack)
app.get('/handle-draw', drawController.handleDraw, redirectBack)
app.get('/admin-draw', checkLogin, drawController.manageDraw, redirectBack)
app.post('/add-draw', checkLogin, upload.single(), drawController.handleAddDraw, redirectBack)
app.post('/update-draw/:id', checkLogin, upload.single(), drawController.handleUpdateDraw, redirectBack)
app.get('/delete-draw/:id', checkLogin, upload.single(), drawController.handleDeleteDraw, redirectBack)

app.listen(port, () => {
  console.log('5001 port listenring now...')
})
