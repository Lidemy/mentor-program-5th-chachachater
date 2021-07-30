const flash = require('connect-flash')
const session = require('express-session')
const db = require('../models')

const PirzeDb = db.draw_api

const prizeController = {
  index: async (req, res, next) => {
    let data = null
    try {
      data = await PirzeDb.findAll()
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    const pict = getPict(data)
    const ratioArr = getRatioArr(data)
    res.render('index.ejs', {
      pict,
      data,
      ratioArr
    })
    return
  },
  handleAddPrize: async (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.photo_link || !req.body.weight) {
      req.flash('errMessage', '請輸入全部欄位')
      next()
      return
    }
    if (!Number.isInteger(req.body.weight) || req.body.weight < 0) {
      req.flash('errMessage', '請輸入正整數或 0')
      next()
      return
    }
    const prize = {}
    prize.name = req.body.name
    prize.description = req.body.description
    prize.photo_link = req.body.photo_link
    prize.weight = req.body.weight
    let data = null
    try {
      data = await PirzeDb.create({
        name: prize.name,
        description: prize.description,
        photo_link: prize.photo_link,
        weight: prize.weight
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，新增獎項失敗')
      next()
      return
    }
    next()
    return
  },
  handleUpdatePrize: async (req, res, next) => {
    if (req.body.weight && (!Number.isInteger(req.body.weight) || req.body.weight < 0)) {
      req.flash('errMessage', '請輸入正整數或 0')
      next()
      return
    }
    const id = parseInt(req.params.id, 10)
    const prize = {}
    prize.name = req.body.name
    prize.description = req.body.description
    prize.photo_link = req.body.photo_link
    prize.weight = req.body.weight
    let data = null
    try {
      data = await PirzeDb.update({
        name: prize.name,
        description: prize.description,
        photo_link: prize.photo_link,
        weight: prize.weight
      }, {
          where: { id },
          fields: [ // 判斷有輸入編輯內容的欄位才做改變, 沒輸入編輯內容則維持原狀
            prize.name? 'name' : null,
            prize.description ? 'description' : null,
            prize.photo_link ? 'photo_link' : null,
            prize.weight ? 'weight' : null,
          ]
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
  managePrize: async (req, res, next) => {
    let data = null
    try {
      data = await PirzeDb.findAll({
        order: [['id', 'DESC']]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    const ratioArr = getRatioArr(data)
    res.render('admin.ejs', { data, ratioArr })
    return
  },
  handleDeletePrize: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    let data = null
    try {
      data = await PirzeDb.destroy({ where: { id } })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，刪除文章失敗')
      next()
      return
    }
    next()
    return
  },
  api: async (req, res) => {
    let data = null
    try {
      data = await PirzeDb.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt']}
      })
    } catch (err) {
      console.log(err)
      res.status(404).send('發生錯誤')
      return
    }
    res.send(data)
    return
  }
}

module.exports = prizeController

function getPict(prize) {
  let totalWeight = 0
  prize.forEach(each => {
    totalWeight += each.weight
  })
  const randomInt = Math.floor(Math.random() * totalWeight)
  const mod = randomInt % totalWeight
  let count = 0
  const pict = prize.find((each, index) => {
    if (index === 0 && (each.weight - mod) > 0) {
      return each
    }
    if (index !== 0) {
      let start = count
      let end = count + each.weight - 1
      if (start <= mod && mod <= end) return each
    }
    count += each.weight
  })
  return pict
}

function getRatioArr(prize) {
  const ratioArr = []
  let totalWeight = 0
  prize.forEach(each => {
    totalWeight += each.weight
  })
  prize.forEach((each, index) => {
    ratioArr.push((each.weight / totalWeight).toFixed(2))
  })
  return ratioArr
}
