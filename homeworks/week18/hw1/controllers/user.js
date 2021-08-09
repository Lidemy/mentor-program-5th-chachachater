const db = require('../models')
const bcrypt = require('bcrypt')
const UserDb = db.Restaurant_user // model name
const saltRounds = 10
console.log(UserDb)
module.exports = {
  register: (req, res, next) => {
    res.render('register.ejs')
  },
  handleRegister: async (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
      req.flash('errMessage', '請輸入帳號及密碼')
      next()
      return
    }
    const hashPassword = await bcrypt.hash(password, saltRounds)
    try {
      await UserDb.create({
        username,
        password: hashPassword
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤, 帳號已存在')
      next()
      return
    }
    req.session.isLogin = true
    res.redirect('/admin-item')
    return
  },
  login: (req, res, next) => {
    res.render('login.ejs')
  },
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errMessage', '請輸入帳號及密碼')
      next()
      return
    }
    let result = null
    try {
      result = await UserDb.findOne({
        where: { username }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    if (!result) {
      req.flash('errMessage', '帳號或密碼錯誤')
      next()
      return
    }
    const match = await bcrypt.compare(password, result.password)
    if(!match) {
      req.flash('errMessage', '帳號或密碼錯誤')
      next()
      return
    }
    req.session.isLogin = true
    res.redirect('/admin-item')
    return
  },
  handleLogout: async (req, res, next) => {
    req.session.isLogin = false
    res.redirect('/register')
    return
  }
}
