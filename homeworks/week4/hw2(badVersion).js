/*
const request = require('request')
const process = require('process')
const userInput1 = process.argv[2]
if (userInput1 === 'list') {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books',
    (error, response, body) => {
      const bodyParse
      try {
        bodyParse = JSON.parse(body)
      } catch (error) {
        console.log('response 不是一個合法的 JSON 字串:', error) // json錯誤處理
      }
      for (let i = 0; i < 20; i++) {
        console.log(bodyParse[i].id + " " + bodyParse[i].name)
      }
    }
  )
}
else if (userInput1 === 'read') {
  const userInput2 = process.argv[3]
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${userInput2}`,
    (error, response, body) => {
      const bodyParse
      try {
        bodyParse = JSON.parse(body)
      } catch (error) {
        console.log('response 不是一個合法的 JSON 字串:', error) // json錯誤處理
      }
      console.log(bodyParse.id + " " + bodyParse.name)
    }
  )
}
else if (userInput1 === 'delete') {
  const userInput2 = process.argv[3]
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${userInput2}`
  )
}
else if (userInput1 === 'create') {
  const userInput2 = process.argv[3]
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        "id": "",
        "name": userInput2 //雖然對方 API 默認會加上 id 這個 key，但 id 順序會被放在最後面
      }
    }
  )
}
else if (userInput1 === 'update') {
  const userInput2 = process.argv[3]
  const userInput3 = process.argv[4]
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${userInput2}`,
      form: {
        "name": userInput3
      }
    }
  )
}
else console.log('fail to do anything')
*/
