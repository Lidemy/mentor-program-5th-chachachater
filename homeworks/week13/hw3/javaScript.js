
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
    </div>`
const init = {
  method: 'GET',
  headers: new Headers({
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'qm66ogvzwsxrzkdyrfrxi748glwjo9'
  })
}
let offset = 20

getTopGame(init)

window.addEventListener('scroll', (e) => {
  if (checkSrollBottom()) {
    getStreams(init, topGameArr[0], 5, offset, false)
    offset += 5
  }
})

async function getTopGame(init) {
  const url = `${baseUrl}/games/top?limit=5`
  fetch(url, init)
    .then((response) => response.json())
    .then((data) => {
      for (const each of data.top) {
        topGameArr.push(each.game.name)
      }
      appendGames(topGameArr[0])
      getStreams(init, topGameArr[0])
      appendNav(init, topGameArr)
    })
}

function getStreams(init, game, limit = 20, offset = 0, boolean) {
  const url = `${baseUrl}/streams/?game=${game}&limit=${limit}&offset=${offset}`
  fetch(url, init)
    .then((response) => response.json())
    .then((data) => appendStreamsPromise(data, boolean))
    .then((resolve) => {
      removeLoader()
      console.log(resolve)
    })
}

function appendNav(init, gameArr) {
  const navRight = document.querySelector('.nav-right')
  const template = document.createElement('template')
  for (let i = 0; i < gameArr.length; i++) {
    if (i === 0) {
      template.innerHTML = `<li  class="active">${gameArr[0]}</li>`
      navRight.append(template.content)
    } else {
      template.innerHTML = `<li>${gameArr[i]}</li>`
      navRight.append(template.content)
    }

    const navRightLi = document.querySelector(`.nav-right li:nth-child(${i + 1})`)
    navRightLi.addEventListener('click', (e) => {
      addLoader()
      document.documentElement.scrollTop = 0
      appendGames(gameArr[i])
      getStreams(init, gameArr[i])
      document.querySelector('.active').classList.remove('active') // 點選 nav 的遊戲之後, 顏色會變黑底
      e.target.classList.add('active')
    })
  }
}

function appendGames(game) {
  const title = document.querySelector('h1')
  title.innerText = `${game}`
}

function appendStreamsPromise(json, clearStreams = true) {
  const streams = document.querySelector('.streams')
  if (clearStreams) streams.innerHTML = '' // 點選別的遊戲之後，原本的內容要清空再載入別的遊戲的實況
  for (const each of json.streams) {
    const template = document.createElement('template')
    template.innerHTML = htmlTemplate
      .replace('$previewLarge', each.preview.large)
      .replace('$channelLogo', each.channel.logo)
      .replace('$channelStatus', each.channel.status)
      .replace('$channelName', each.channel.display_name)
    streams.append(template.content)
  }
  return new Promise((resolve) => {
    resolve('append finished')
  })
}

function removeLoader() {
  const loaderDiv = document.querySelector('#loader-block')
  if (loaderDiv.classList.contains('loader-block')) {
    loaderDiv.classList.remove('loader-block')
  }
}

function addLoader() {
  const loaderDiv = document.querySelector('#loader-block')
  loaderDiv.classList.add('loader-block')
}

function checkSrollBottom() {
  const clientHeight = window.innerHeight
  const pageHeight = document.body.scrollHeight
  const { scrollTop } = document.documentElement
  if ((clientHeight + scrollTop) >= pageHeight) return true
  return false
}
