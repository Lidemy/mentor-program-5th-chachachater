// 本來是用 is else condtion 寫, 參考範例之後發現用 switch 會更簡潔
const request = require('request')
const process = require('process')

const userInput1 = process.argv[2]
const userInput2 = process.argv[3]
const userInput3 = process.argv[4]
const baseURL = 'https://lidemy-book-store.herokuapp.com'

switch (userInput1) {
  case 'list':
    listBooks()
    break
  case 'read':
    if (!userInput2) {
      console.log('請輸入要查詢書本的 id')
      return
    }
    readOneBook(userInput2)
    break
  case 'delete':
    if (!userInput2) {
      console.log('請輸入要刪除書本的 id')
      return
    }
    deleteOneBook(userInput2)
    break
  case 'create':
    if (!userInput2) {
      console.log('請輸入要新增書本的 id')
      return
    }
    createOneBook(userInput2)
    break
  case 'update':
    if (!userInput2 || !userInput3) {
      console.log('請輸入要更新書本的 id 或要新增的內容')
      return
    }
    updateOneBook(userInput2, userInput3)
    break
  default:
    console.log('fail to do anything, please try again')
}

function listBooks() {
  request.get(
    `${baseURL}/books?_limit=20`,
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode > 300) {
        console.log('錯誤, statusCode :', response.statusCode)
        return
      }
      if (error) {
        console.log('錯誤', error)
        return
      }
      let bodyParse
      try {
        bodyParse = JSON.parse(body)
      } catch (error) {
        console.log('response 不是一個合法的 JSON 字串:', error) // json錯誤處理
      }
      for (let i = 0; i < 20; i++) {
        const { id, name } = bodyParse[i]
        console.log(`${id} ${name}`)
      }
      return
    }
  )
}

function readOneBook(id) {
  request.get(
    `${baseURL}/books/${id}`,
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode > 300) {
        console.log('找不到這本書, 發生錯誤, statusCode :', response.statusCode)
        return
      }
      if (error) {
        console.log('錯誤', error)
        return
      }
      let bodyParse
      try {
        bodyParse = JSON.parse(body)
      } catch (error) {
        console.log('response 不是一個合法的 JSON 字串:', error) // json錯誤處理
      }
      const { id, name } = bodyParse
      console.log(`${id} ${name}`)
      return
    }
  )
}

function deleteOneBook(id) {
  request.delete(
    `${baseURL}/books/${id}`,
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode > 300) {
        console.log('找不到這本書, 發生錯誤, statusCode :', response.statusCode)
        return
      }
      if (error) {
        console.log('錯誤', error)
        return
      }
      console.log('刪除成功')
      return
    }
  )
}

function createOneBook(bookName) {
  request.post(
    {
      url: `${baseURL}/books`,
      form: {
        id: '',
        name: userInput2 // 雖然對方 API 默認會加上 id 這個 key，但 id 順序會被放在 'name' 後面, 所以我額外放上 'id' key 來處理這個問題
      }
    },
    (error, response, body) => {
      console.log(response)
      if (response.statusCode < 200 || response.statusCode > 300) {
        console.log('錯誤, statusCode :', response.statusCode)
        return
      }
      if (error) {
        console.log('錯誤', error)
        return
      }
      console.log('新增成功')
      return
    }
  )
}

function updateOneBook(id, bookName) {
  request.patch(
    {
      url: `${baseURL}/books/${userInput2}`,
      form: {
        name: userInput3
      }
    },
    (error, response, body) => {
      if (response.statusCode < 200 || response.statusCode > 300) {
        console.log('找不到這本書, 發生錯誤, statusCode :', response.statusCode)
        return
      }
      if (error) {
        console.log('錯誤', error)
        return
      }
      console.log('更新成功')
      return
    }
  )
}
