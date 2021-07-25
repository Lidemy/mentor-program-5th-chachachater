const flash = require('connect-flash')
const session = require('express-session')
const db = require('../models')

const ArticleDb = db.blog_article
const CategoryDb = db.blog_category

const articleController = {
  index: async (req, res, next) => {
    let data = null
    try {
      data = await ArticleDb.findAll({
        include: [{ model: CategoryDb}],
        order: [['id', 'DESC']],
        limit: 5,
        where: { is_deleted: 0 }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('index.ejs', {
      articleArr: data,
      isLogin: res.locals.isLogin
    })
    return
  },
  getArticle: async (req, res, next) => {
    const { id } = req.params
    let data = null
    try {
      data = await ArticleDb.findOne({
        include: [{ model: CategoryDb}],
        where: {
          id,
          is_deleted: 0 // is_deleted = 0 確保不會有人透過改 url id 來取得已刪除的文章
        }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('article.ejs', {
      article: data,
      isLogin: res.locals.isLogin
    })
    return
  },
  about: (req, res, next) => {
    res.render('about.ejs')
    return
  },
  getAllArticle: async (req, res, next) => {
    const articleAmount = await ArticleDb.count({
      where: { is_deleted: 0 }
    })
    const page = parseInt(req.params.page, 10)
    const articlesPerPage = 10
    const pagination = (page - 1) * articlesPerPage
    const pageAmount = Math.ceil(articleAmount / articlesPerPage)
    let data = null
    try {
      data = await ArticleDb.findAll({
        where: { is_deleted: 0},
        order: [['id', 'DESC']],
        limit: articlesPerPage,
        offset: pagination
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    if (!data.length) {
      res.end()
      return
    }
    res.render('all_articles.ejs', {
      articleArr: data,
      articleAmount,
      pageAmount,
      page
    })
    return
  },
  addArticle: async (req, res, next) => {
    let data = null
    try {
      data = await CategoryDb.findAll({
        where: {
          is_deleted: 0
        }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('add_article.ejs', {
      categoryArr: data,
    })
    return
  },
  handleAddArticle: async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
      req.flash('errMessage', '請輸入標題及內容')
      next()
      return
    }
    const article = {}
    article.title = req.body.title
    article.categoryId = req.body.category_id
    article.content = req.body.content
    try {
      await ArticleDb.create({
        title: article.title,
        category_id: article.categoryId,
        content: article.content,
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，新增文章失敗')
      next()
      return
    }
    next()
    return
  },
  updateArticle: async (req, res, next) => {
    const { id } = req.params
    let articleData = null
    let categoryData = null
    try {
      articleData = await ArticleDb.findOne({
        include: [{ model: CategoryDb }],
        where: {
          id
        }
      })
      categoryData = await CategoryDb.findAll({
        where: {
          is_deleted: 0
        }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('update_article.ejs', {
      article: articleData,
      categoryArr: categoryData
    })
    return
  },
  handleUpdateArticle: async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
      req.flash('errMessage', '請輸入標題及內容')
      next()
      return
    }
    const article = {}
    article.id = parseInt(req.params.id, 10)
    article.title = req.body.title
    article.categoryId = req.body.category_id
    article.content = req.body.content
    try {
      await ArticleDb.update({
        title: article.title,
        category_id: article.categoryId,
        content: article.content,
      }, {
        where: { id: article.id }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，編輯文章失敗')
      next()
      return
    }
    next()
    return
  },
  handleDeleteArticle: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    try {
      await ArticleDb.update({
        is_deleted: 1
      }, {
        where: { id }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，刪除文章失敗')
      next()
      return
    }
    next()
    return
  },
  handleRecoveryArticle: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    try {
      await ArticleDb.update({
        is_deleted: 0
      }, {
        where: { id }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，恢復文章失敗')
      next()
      return
    }
    next()
    return
  },
  manageArticle: async (req, res, next) => {
    const articleAmount = await ArticleDb.count({
      where: { is_deleted: 0 }
    })
    const page = parseInt(req.params.page, 10)
    const articlesPerPage = 10
    const pagination = (page - 1) * articlesPerPage
    const pageAmount = Math.ceil(articleAmount / articlesPerPage)
    let data = null
    try {
      data = await ArticleDb.findAll({
        order: [['id', 'DESC']],
        limit: articlesPerPage,
        offset: pagination
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('admin_article.ejs', {
      articleArr: data,
      articleAmount,
      pageAmount,
      page
    })
    return
  },
  manageCategory: async (req, res, next) => {
    let data = null
    try {
      data = await CategoryDb.findAll({
        order: [['id', 'DESC']]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('admin_category.ejs', {
      categoryArr: data
    })
    return
  },
  addCategory: async (req, res, next) => {
    res.render('add_category.ejs')
    return
  },
  handleAddCategory: async (req, res, next) => {
    if (!req.body.category) {
      req.flash('errMessage', '請輸入分類名稱')
      next()
      return
    }
    const { category } = req.body
    try {
      await CategoryDb.create({
        category
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，新增分類失敗')
      next()
      return
    }
    res.redirect('/admin_category')
    return
  },
  updateCategory: async (req, res, next) => {
    const { id } = req.params
    let data = null
    try {
      data = await CategoryDb.findOne({
        where: {
          id,
        }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('update_category.ejs', {
      category: data
    })
    return
  },
  handleUpdateCategory: async (req, res, next) => {
    if (!req.body.category) {
      req.flash('errMessage', '請輸入分類名稱')
      next()
      return
    }
    const category = {}
    category.id = parseInt(req.body.id, 10)
    category.category = req.body.category
    console.log('category', category)
    try {
      await CategoryDb.update({
        category: category.category
      }, {
        where: { id: category.id }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，編輯文章失敗')
      next()
      return
    }
    res.redirect('/admin_category')
    return
  },
  handleDeleteCategory: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    try {
      await CategoryDb.update({
        is_deleted: 1
      }, {
        where: { id }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，刪除分類失敗')
      next()
      return
    }
    next()
    return
  },
  handleRecoveryCategory: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    try {
      await CategoryDb.update({
        is_deleted: 0
      }, {
        where: { id }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，恢復分類失失敗')
      next()
      return
    }
    next()
    return
  }
}

module.exports = articleController
