const db = require('../models')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const multer = require('multer')
const FormData = require('form-data')

const FaqDb = db.Restaurant_faq // model name
const ItemDb = db.Restaurant_item // model name

module.exports = {
  menu: async (req, res, next) => {
    let data = null
    try {
      data = await ItemDb.findAll({
        order: [['id', 'ASC']]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('menu.ejs', { data })
    return
  },
  faq: async (req, res, next) => {
    let data = null
    try {
      data = await FaqDb.findAll({
        order: [['order', 'ASC']]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('faq.ejs', { data })
    return
  },
  manageFaq: async (req, res, next) => {
    let data = null
    try {
      data = await FaqDb.findAll({
        order: [['order', 'ASC']]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('faqManage.ejs', { data })
    return
  },
  handleAddFaq: async (req, res, next) => {
    const order = Number(req.body.order, 10)
    if (!Object.values(req.body).every(element => element)) {
      req.flash('errMessage', '請輸入全部欄位')
      next()
      return
    }
    if (!checkValidNumber(req.body.order)) {
      req.flash('errMessage', 'Order 請輸入正整數')
      next()
      return
    }
    const { title, content } = req.body
    try {
      await FaqDb.create({
        title,
        content,
        order
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，新增 FAQ 失敗, order / title 不可重複')
      next()
      return
    }
    next()
    return
  },
  handleUpdateFaq: async (req, res, next) => {
    if (!checkValidNumber(req.body.order)) {
      req.flash('errMessage', 'Order 請輸入正整數')
      next()
      return
    }
    const order = Number(req.body.order, 10)
    const id = parseInt(req.params.id, 10)
    const { title, content } = req.body
    try {
      await FaqDb.update({
        title,
        content,
        order
      }, {
        where: { id },
        fields: [ // 判斷有輸入編輯內容的欄位才做改變, 沒輸入編輯內容則維持原狀
          title ? 'title' : null,
          content ? 'content' : null,
          order ? 'order' : null
        ]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，編輯 FAQ 失敗, order / title 不可重複')
      next()
      return
    }
    next()
    return
  },
  handleDeleteFaq: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    try {
      await FaqDb.destroy({ where: { id } })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，刪除文章失敗')
      next()
      return
    }
    next()
    return
  },
  manageItem: async (req, res, next) => {
    let data = null
    try {
      data = await ItemDb.findAll()
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    res.render('itemManage.ejs', { data })
    return
  },
  handleAddItem: async (req, res, next) => {
    const price = Number(req.body.price, 10)
    if (!Object.values(req.body).every(element => element)) {
      req.flash('errMessage', '請輸入全部欄位')
      next()
      return
    }
    if (!checkValidNumber(req.body.price)) {
      req.flash('errMessage', 'price 請輸入正整數')
      next()
      return
    }
    const { name } = req.body
    const imageName = req.file.originalname
    const result = await uploadImage(req)
    const { id, deletehash, link } = result.data
    try {
      await ItemDb.create({
        name,
        price,
        id_hash: id,
        delete_hash: deletehash,
        link
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，新增商品失敗, 商品名稱不可重複')
      next()
      return
    }
    next()
    return
  },
  handleUpdateItem: async (req, res, next) => {
    if (!checkValidNumber(req.body.price)) {
      req.flash('errMessage', 'price 請輸入正整數')
      next()
      return
    }
    if (!checkValidOnSale(req.body['on-sale'])) {
      req.flash('errMessage', '上架欄位錯誤')
      next()
      return
    }
    const itemData = {}
    itemData.price = Number(req.body.price, 10)
    itemData.onSale = Number(req.body['on-sale'], 10)
    itemData.id = parseInt(req.params.id, 10)
    itemData.name = req.body.name
    if (req.file) {
      itemData.imageName = req.file.originalname
      const result = await uploadImage(req)
      itemData.idHash = result.data.id
      itemData.deleteHash = result.data.deletehash
      itemData.link = result.data.link
    }
    let result = null
    try {
      result = await ItemDb.update({
        name: itemData.name,
        price: itemData.price,
        id_hash: itemData.idHash,
        on_sale: itemData.onSale,
        delete_hash: itemData.deleteHash,
        link: itemData.link
      }, {
        where: { id: itemData.id },
        fields: [ // 判斷有輸入編輯內容的欄位才做改變, 沒輸入編輯內容則維持原狀
          itemData.name ? 'name' : null,
          itemData.price ? 'price' : null,
          itemData.idHash ? 'id_hash' : null,
          'on_sale',
          itemData.deleteHash ? 'delete_hash' : null,
          itemData.link ? 'link' : null
        ]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，編輯商品失敗, 商品名稱不可重複')
      next()
      return
    }
    next()
    return
  },
  handleDeleteItem: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    try {
      await ItemDb.destroy({ where: { id } })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，刪除文章失敗')
      next()
      return
    }
    next()
    return
  },
}

async function uploadImage(req) {
  const myHeaders = new fetch.Headers()
  myHeaders.append("Authorization", "Client-ID fcb0c4d41ca1464")
  const formData = new FormData()
  formData.append(
    'image', req.file.buffer
  )
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }
  const result = await fetch("https://api.imgur.com/3/image", requestOptions)
  return result.json()
}

function checkValidNumber(strNumber) { // number 相關的欄位可以不填, 但只接受正整數並且不接受 0
  if (!strNumber) return true
  const number = Number(strNumber, 10)
  if (number === 0) {
    return false
  }
  if (!Number.isInteger(number) || number < 0) {
    return false
  }
  return true
}

function checkValidOnSale(strNumber) { // on-sale 欄位只接受 1 或 0
  const number = Number(strNumber, 10)
  if (number !== 1 && number !== 0) {
    return false
  }
  return true
}