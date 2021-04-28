const request = require('request')

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10', // 放headers
  (error, response, body) => {
    if (error) {
      console.log('錯誤', error)
      return
    }
    let bodyParse = ''
    try { // 看自我檢討後，發現自己沒有想到一些錯誤情況例如: url 錯誤, 一樣會正常送出 reuqest 但會得到錯誤的 bodyParse
      bodyParse = JSON.parse(body)
    } catch (err) {
      console.log('錯誤:', err)
      return
    }
    for (let i = 0; i < 10; i++) {
      const { id } = bodyParse[i]
      const { name } = bodyParse[i]
      console.log(`${id} ${name}`)
    }
  }
)
