const request = require('request')
const process = require('process')

const userinput = process.argv[2]

request.get(
  `https://restcountries.eu/rest/v2/name/${userinput}`,
  (error, response, body) => {
    if (error) {
      console.log('錯誤:', error)
      return
    }
    if (!userinput) {
      console.log('請輸入國家名稱')
      return
    }
    const { statusCode } = response
    if (statusCode >= 400 && statusCode < 500) {
      console.log('找不到國家資訊')
      return
    }
    let bodyParse = ''
    try {
      bodyParse = JSON.parse(body)
    } catch (error) {
      console.log('response 不是一個合法的 JSON 字串:', error) // json錯誤處理
    }
    const bodyNumber = bodyParse.length
    for (let i = 0; i < bodyNumber; i++) {
      const countryName = bodyParse[i].name
      const countryCapital = bodyParse[i].capital
      const countryCurrency = bodyParse[i].currencies[0].code
      const countryCode = bodyParse[i].callingCodes[0]
      console.log('============')
      console.log(`國家：${countryName}`)
      console.log(`首都：${countryCapital}`)
      console.log(`貨幣：${countryCurrency}`)
      console.log(`國碼：${countryCode}`)
    }
    console.log('搜尋結束')
  }
)
