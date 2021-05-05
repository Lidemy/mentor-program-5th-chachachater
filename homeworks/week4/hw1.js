const request = require('request')

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10', // 放headers
  (error, response, body) => {

    if (response.statusCode < 200 || response.statusCode > 300) {
      console.log('錯誤, statusCode :', response.statusCode)
      return
    }

    if (error) {
      console.log('錯誤', error)
      return
    }

    let bodyParse = ''
    try { // 處理錯誤情況例如: url 錯誤, 一樣會正常送出 reuqest 但會得到錯誤的 bodyParse
      bodyParse = JSON.parse(body)
    } catch (err) {
      console.log('取得 JSON 時發生錯誤:', err)
      return
    }

    for (let i = 0; i < 10; i++) {
      const { id } = bodyParse[i]
      const { name } = bodyParse[i]
      console.log(`${id} ${name}`)
    }
  }
)
