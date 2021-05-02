# week4 挑戰題系列

紀錄一下解法和遇到的坑。
Twitch API 有兩個版本，挑戰題使用的是新版（helix）。

## 全域變數的坑：全域就只會執行一次

```javascript=
const request = require('request')

let gameId = -1
const baseUrlA = 'https://api.twitch.tv/helix/games'
const baseUrlB = 'https://api.twitch.tv/helix/streams'
let gameName = 'Fortnite'



const outHeader = {
  url: `${baseUrlA}?name=${gameName}`
}

function outCallback(error, response, body) {
  gameId = body.id //取出遊戲的 id，這裡假設 gameId = 9999
  request(inHeader, inCallback)
}

const inHeader = {
  url: `${baseUrlB}?game_id=${gameId}`
}

function inCallback(error, response, body) 
}


request(outHeader, outCallback)
```
根據上面的程式碼做的事情（只留下有關的部分其餘省略），試問兩個 header 分別傳了甚麼 url 進去？
![](https://i.imgur.com/AzoxctA.png)

結果會是：
```
outHeader 'https://api.twitch.tv/helix/games?name=Fortnite'
inHeader `https://api.twitch.tv/helix/streams?game_id=-1`
```

而不是：
```
outHeader 'https://api.twitch.tv/helix/games?name=Fortnite'
inHeader `https://api.twitch.tv/helix/streams?game_id=9999`
```

原因是：

把 `const inHeader` 放在最外面，也就是我們俗稱的全域，**全域就只會執行這麼一次**，所以 inHeader 也就只有在程式執行時，被賦值了這麼一次(第3行程式碼)，就沒有再被重新賦值的機會了，所以這時候就算 gameId 從 -1 被改成了新的 id，inHeader 因為沒有機會再被賦值，所以就只能在外面繼續掛著 -1，即使做了 `gameId = body.id` 重新賦值，也不會有效。

解套方法是：

用 function 來回傳值，等到 該 function 被呼叫的時候才會執行。
```javascript=
const request = require('request')

let gameId = -1
const baseUrlA = 'https://api.twitch.tv/helix/games'
const baseUrlB = 'https://api.twitch.tv/helix/streams'
let gameName = 'Fortnite'

function getOutHeader () {
  const outUrl = `${baseUrlA}?name=${gameName}`
  return outUrl
}

function outCallback(error, response, body) {
  gameId = body.id //取出遊戲的 id，這裡假設 gameId = 9999
  request(getInHeader(), inCallback)
}


function getInHeader () {
  const inUrl = `${baseUrlB}?game_id=${gameId}`
  return inUrl
}

function inCallback(error, response, body) 
}

request(getOutHeader(), outCallback)
```

### 新版 API(代號 helix) 的使用方式
request 的格式需要有 Client-Id、Authorization
```bash=
curl -X GET 'https://api.twitch.tv/helix/streams' \
-H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
-H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz'
```
1. 取得 client ID: [教學](https://dev.twitch.tv/docs/api#step-1-setup)
> To make API calls, you need a client ID. To receive one, log into the Twitch developer console...

註冊完之後來到這裡看 ID↓
![](https://i.imgur.com/1kJmERl.png)

2. 做 Authentication:
[教學](https://dev.twitch.tv/docs/authentication/)
需要注意新版 API 有五種驗證方式，選自己要用的驗證方式
> The procedure you should use to get tokens depends on the type(s) of tokens you want:

這次挑戰題使用 OAuth implicit code flow，[驗證教學](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-implicit-code-flow)

做完驗證就可以取得 access token，可以開始跟 API 要資料囉~!



