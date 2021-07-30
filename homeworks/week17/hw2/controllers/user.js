const db = require('../models')
const bcrypt = require('bcrypt')
const UserDb = db.draw_api_admin
const saltRounds = 10

const userController = {
  register: (req, res, next) => {
    res.render('register.ejs')
    return
  },
  handleRegister: async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      req.flash('errMessage', '請輸入全部欄位')
      next()
      return
    }
    const user = {}
    user.username = req.body.username
    user.password = req.body.password
    user.hashPassword = await bcrypt.hash(user.password, saltRounds)
    let data = null
    try {
      data = await UserDb.create({
        username: user.username,
        password: user.hashPassword
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '帳號已存在')
      next()
      return
    }
    req.session.isLogin = true
    req.session.username = data.username
    res.redirect('/index')
    return
  },
  login: (req, res, next) => {
    res.render('login.ejs', { isLogin: res.locals.isLogin })
    return
  },
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errMessage', '請輸入帳號及密碼')
      next()
      return
    }
    const data = await UserDb.findOne({
      where: {
        username
      }
    })
    if (!data) {
      req.flash('errMessage', '帳號或密碼錯誤')
      next()
      return
    }
    req.session.isLogin = true
    req.session.username = data.username
    res.redirect('/index')
    return
  },
  handleLogout: (req, res, next) => {
    req.session.isLogin = false
    next()
    return
  }
}

module.exports = userController
