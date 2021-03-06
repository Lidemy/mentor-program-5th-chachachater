
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

run()

window.addEventListener('scroll', async(e) => {
  if (checkSrollBottom()) {
    const data = await getStreams(init, topGameArr[0], 5, offset, false)
    const resolve = await appendStreams(data, false)
    console.log(resolve)
    removeLoader()
    offset += 5
  }
})

async function getTopGame(init) {
  const url = `${baseUrl}/games/top?limit=5`
  const response = await fetch(url, init)
  const data = await response.json()
  for (const each of data.top) {
    topGameArr.push(each.game.name)
  }
}

async function run() {
  await getTopGame(init)
  appendGames(topGameArr[0])
  appendNav(init, topGameArr)
  const data = await getStreams(init, topGameArr[0])
  const resolve = await appendStreams(data, true)
  console.log(resolve)
  removeLoader()
}

async function getStreams(init, game, limit = 20, offset = 0, boolean) {
  const url = `${baseUrl}/streams/?game=${game}&limit=${limit}&offset=${offset}`
  const response = await fetch(url, init)
  const data = await response.json()
  return data
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
    navRightLi.addEventListener('click', async(e) => {
      addLoader()
      document.documentElement.scrollTop = 0
      appendGames(gameArr[i])
      const data = await getStreams(init, topGameArr[i])
      const resolve = await appendStreams(data, true)
      console.log(resolve)
      removeLoader()
      document.querySelector('.active').classList.remove('active') // ?????? nav ???????????????, ??????????????????
      e.target.classList.add('active')
    })
  }
}

function appendGames(game) {
  const title = document.querySelector('h1')
  title.innerText = `${game}`
}

function appendStreams(json, clearStreams = true) {
  const streams = document.querySelector('.streams')
  if (clearStreams) streams.innerHTML = '' // ?????????????????????????????????????????????????????????????????????????????????
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
