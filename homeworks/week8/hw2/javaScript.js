
const baseUrl = 'https://api.twitch.tv/kraken'
const topGameArr = []
const htmlTemplate = `
    <div class="single-stream">
    <div class="preview-large" style="background-image: url('$previewLarge')"></div>
    <div class="container">
      <div class="logo" style="background-image: url('$channelLogo')"></div>
        <div class="stream-content">
          <p class="status">$channelStatus</p>
          <p class="display-name">$channelName</p>
        </div>
      </div>
`

getTopGame()

function getTopGame() {
  const request = new XMLHttpRequest()
  const url = `${baseUrl}/games/top?limit=5`

  request.addEventListener('error', (e) => { alert(e.type) })
  request.open('GET', url, true)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.setRequestHeader('Client-ID', 'qm66ogvzwsxrzkdyrfrxi748glwjo9')
  request.addEventListener('load', (e) => {
    if (request.status >= 400) {
      alertError('handling request/response', request.status)
    }

    let response = ''
    let json = ''
    try {
      response = request.response
      json = JSON.parse(response)
    } catch (error) {
      alert('oops, something went wrong with JSON...')
      return
    }

    for (const each of json.top) {
      topGameArr.push(each.game.name)
    }
    getStreams(topGameArr[0])
    appendNav(topGameArr, getStreams)
  })
  request.send()
}

// ex: getStreams("Just Chatting")
function getStreams(game) {
  const secondRequest = new XMLHttpRequest()
  const url = `${baseUrl}/streams/?game=${game}&limit=20`

  secondRequest.addEventListener('error', (e) => { alert(e.type) })
  secondRequest.open('GET', url, true)
  secondRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  secondRequest.setRequestHeader('Client-ID', 'qm66ogvzwsxrzkdyrfrxi748glwjo9')
  secondRequest.addEventListener('load', (e) => {
    if (secondRequest.status >= 400) {
      alertError('loading streams', secondRequest.status)
    }
    appendGames(game)
    let response = ''
    let json = ''
    try {
      response = secondRequest.response
      json = JSON.parse(response)
    } catch (error) {
      alert('oops, something went wrong with JSON...')
      return
    }
    appendStreams(json)
  })
  secondRequest.send()
}

function alertError(reasonStr, statuscode) { // 處理 statuscode 錯誤的情況
  console.log(`oops, something went wrong while ${reasonStr} ...the statuscode is ${statuscode}`)
  alert(`oops, something went wrong while ${reasonStr} ...the statuscode is ${statuscode}`)
}

function appendNav(gameArr, callback) {
  const navRight = document.querySelector('.nav-right')
  navRight.innerHTML = `
      <li  class="active">${gameArr[0]}</li>
      <li>${gameArr[1]}</li>
      <li>${gameArr[2]}</li>
      <li>${gameArr[3]}</li>
      <li>${gameArr[4]}</li>
    `
  for (let i = 0; i < gameArr.length; i++) {
    const navRightLi = document.querySelector(`.nav-right li:nth-child(${i + 1})`)
    navRightLi.addEventListener('click', (e) => {
      callback(gameArr[i])
      document.querySelector('.active').classList.remove('active') // 點選 nav 的遊戲之後, 顏色會變黑底
      e.target.classList.add('active')
    })
  }
}

function appendGames(game) {
  const title = document.querySelector('h1')
  title.innerText = `${game}`
}

function appendStreams(json) {
  const streams = document.querySelector('.streams')
  streams.innerHTML = '' // 點選別的遊戲之後，原本的內容要清空再載入別的遊戲的實況
  for (const each of json.streams) {
    const template = document.createElement('template')
    template.innerHTML = htmlTemplate
      .replace('$previewLarge', each.preview.large)
      .replace('$channelLogo', each.channel.logo)
      .replace('$channelStatus', each.channel.status)
      .replace('$channelName', each.channel.display_name)
    streams.append(template.content)
  }
}
