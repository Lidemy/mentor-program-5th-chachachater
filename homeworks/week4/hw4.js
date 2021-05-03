const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'qm66ogvzwsxrzkdyrfrxi748glwjo9'
  }
}

request.get(
  options,
  (error, response, body) => {
    if (error) {
      console.log('錯誤:', error)
      return
    }
    let bodyParse = ''
    try {
      bodyParse = JSON.parse(body)
    } catch (error) {
      console.log(error)
    }
    for (let i = 0; i < 10; i++) {
      const gameName = bodyParse.top[i].game.name
      const gameViewers = bodyParse.top[i].game.name.viewers
      console.log(`${gameViewers}  ${gameName}`)
    }
  }
)
