const request = require('request')
const process = require('process')

let gameId = -1
const dataNumber = 100
const streamInfo = []
let cursor = ''
const baseUrlForStream = 'https://api.twitch.tv/helix/streams'
// const gameName = process.argv[2] // 輸入要搜尋的遊戲名稱
let gameName = 'Fortnite'

const baseUrlForGame = 'https://api.twitch.tv/helix/games'

// 搜尋 遊戲id 用的 header 是 game, 使用的 callback 是 getGameInfo

function getGameOptions() {
  const gameHeader = {
    url: `${baseUrlForGame}?name=${gameName}`,
    headers: {
      'User-Agent': 'request',
      Authorization: 'Bearer /*這裡要放 Token*/',
      'Client-Id': '/*這裡要放Client-Id*/'
    }
  }
  return gameHeader
}

function getGameInfo(error, response, body) {
  console.log(`開始搜尋遊戲 "${gameName}" 的實況資訊`)
  if (error) {
    console.log('發生錯誤:', error)
    return
  }
  let parseInfo = ''
  try {
    parseInfo = JSON.parse(body)
  } catch (error) {
    console.log('JSON 取得有問題:', error)
    return
  }
  try {
    gameId = parseInfo.data[0].id
  } catch (error) {
    console.log('找不到該遊戲的實況資訊, 請重新輸入正確名稱')
    return
  }
  console.log('遊戲搜尋結束')
  request(getStreamOptions(), getStreamInfo)
}

// 總共搜尋了兩次實況主資訊，第一次搜尋實況主用的 header 是 streamHeader, 使用的 callback 是 getStreamInfo
// 第二次搜尋實況主用的 header 是 SecondStreamHeader, 使用的 callback 是 getSecondStreamInfo

function getStreamOptions() {
  const streamHeader =
  {
    url: `${baseUrlForStream}?game_id=${gameId}&first=${dataNumber}`,
    headers: {
      'User-Agent': 'request',
      Authorization: 'Bearer /*這裡要放 Token*/',
      'Client-Id': '/*這裡要放Client-Id*/'
    }
  }
  return streamHeader
}

function getStreamInfo(error, response, body) {
  if (error) {
    console.log('發生錯誤:', error)
    return
  }
  let parseInfo = ''
  try {
    parseInfo = JSON.parse(body)
  } catch (error) {
    console.log('JSON 取得有問題:', error)
    return
  }

  try {
    for (let i = 0; i < parseInfo.data.length; i++) {
      streamInfo.push(
        {
          id: parseInfo.data[i].id,
          gameName: parseInfo.data[i].user_name
        }
      )
    }
  } catch (error) {
    console.log('找不到該遊戲的實況資訊')
    return
  }

  console.log('第一次實況搜尋結束')
  cursor = parseInfo.pagination.cursor
  request(getSecondStreamHeader(), getSecondStreamInfo)
}

function getSecondStreamOptions() {
  const secondStreamHeader =
  {
    url: `${baseUrlForStream}?game_id=${gameId}&first=${dataNumber}&after=${cursor}`,
    headers: {
      'User-Agent': 'request',
      Authorization: 'Bearer /*這裡要放 Token*/',
      'Client-Id': '/*這裡要放Client-Id*/'
    }
  }
  return secondStreamHeader
}

function getSecondStreamInfo(error, response, body) {
  if (error) {
    console.log('發生錯誤:', error)
    return
  }
  let parseInfo = ''
  try {
    parseInfo = JSON.parse(body)
  } catch (error) {
    console.log('JSON 取得有問題:', error)
    return
  }

  try {
    for (let i = 0; i < parseInfo.data.length; i++) {
      const singleStream = {}
      singleStream.id = parseInfo.data[i].id
      singleStream.gameName = parseInfo.data[i].user_name
      streamInfo.push(singleStream)
    }
  } catch (error) {
    console.log('找不到該遊戲的實況資訊')
    return
  }

  console.log('第二次實況搜尋結束')
  console.log('顯示 "實況的名稱 : id"')
  for (let i = 1; i <= streamInfo.length; i++) {
    if (!streamInfo[i]) return
    const streamName = streamInfo[i].gameName
    const streamId = streamInfo[i].id
    console.log(`${i}. ${streamName} : ${streamId}`)
  }
}

request(getGameOptions(), getGameInfo)
