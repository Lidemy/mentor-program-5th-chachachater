// 本來是用 is else condtion 寫, 參考範例之後發現用 switch 會更簡潔
const request = require('request')
const process = require('process')

const userInput1 = process.argv[2]
const userInput2 = process.argv[3]
const userInput3 = process.argv[4]

switch (userInput1) {
  case 'list':
    listBooks()
    break
  case 'read':
    readOneBook(userInput2)
    break
  case 'delete':
    deleteOneBook(userInput2)
    break
  case 'create':
    createOneBook(userInput2)
    break
  case 'update':
    updateOneBook(userInput2, userInput3)
    break
  default:
    console.log('fail to do anything, please try again')
}

function listBooks() {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
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
    }
  )
}

function readOneBook(id) {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (error, response, body) => {
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
    }
  )
}

function deleteOneBook(id) {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (error, response, body) => {
      if (error) {
        console.log('錯誤', error)
        return
      }
      console.log('刪除成功')
    }
  )
}

function createOneBook(bookName) {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        id: '',
        name: userInput2 // 雖然對方 API 默認會加上 id 這個 key，但 id 順序會被放在 'name' 後面, 所以我額外放上 'id' key 來處理這個問題
      }
    },
    (error, httpResponse, body) => {
      if (error) {
        console.log('錯誤', error)
        return
      }
      console.log('新增成功')
    }
  )
}

function updateOneBook(id, bookName) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${userInput2}`,
      form: {
        name: userInput3
      }
    },
    (error, httpResponse, body) => {
      if (error) {
        console.log('錯誤', error)
        return
      }
      console.log('更新成功')
    }
  )
}
