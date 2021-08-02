const flash = require('connect-flash')
const session = require('express-session')
const db = require('../models')
const DrawDb = db.Restaurant_draw


module.exports = {
  draw: async (req, res, next) => {
    let data = null
    try {
      data = await DrawDb.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'weight'] }
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    console.log(data)
    res.render('draw.ejs', { data })
    return
  },
  handleDraw: async (req, res, next) => {
    let data = null
    try {
      data = await DrawDb.findAll()
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    const pict = getPrize(data)
    res.render('drawResult.ejs', { pict })
    return
  },
  handleAddDraw: async (req, res, next) => {
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
    const prize = {}
    prize.name = req.body.name
    prize.description = req.body.description
    prize.photo_link = req.body.photo_link
    prize.weight = req.body.weight
    let data = null
    try {
      data = await DrawDb.create({
        name: prize.name,
        description: prize.description,
        photo_link: prize.photo_link,
        weight: prize.weight
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，新增失敗')
      next()
      return
    }
    next()
    return
  },
  handleUpdateDraw: async (req, res, next) => {
    if (!checkValidNumber(req.body.price)) {
      req.flash('errMessage', 'price 請輸入正整數')
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
      data = await DrawDb.update({
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
      req.flash('errMessage', '發生錯誤，編輯失敗')
      next()
      return
    }
    next()
    return
  },
  manageDraw: async (req, res, next) => {
    let data = null
    try {
      data = await DrawDb.findAll({
        order: [['id', 'DESC']]
      })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤')
      next()
      return
    }
    const ratioArr = getRatioArr(data)
    res.render('drawManage.ejs', { data, ratioArr })
    return
  },
  handleDeleteDraw: async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    let data = null
    try {
      data = await DrawDb.destroy({ where: { id } })
    } catch (err) {
      console.log(err)
      req.flash('errMessage', '發生錯誤，刪除失敗')
      next()
      return
    }
    next()
    return
  },
  api: async (req, res) => {
    let data = null
    try {
      data = await DrawDb.findAll({
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

function getPrize(prize) {
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
