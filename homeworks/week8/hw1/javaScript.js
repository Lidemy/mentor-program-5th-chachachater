const request = new XMLHttpRequest()
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'

function burgerChange(x) { // 漢堡選單
  x.classList.toggle('change')
  console.log('click')
}
const burgerBox = document.querySelector('input[type="checkbox"]')
const burger = document.querySelector('.burger')
burgerBox.addEventListener('click', (e) => {
  burgerChange(burger)
})

const drawBtn = document.querySelector('.info .btn-draw')
drawBtn.addEventListener('click', (e) => {
  request.open('GET', url, true)
  request.send()
})

request.addEventListener('load', (e) => {
  let json = ''
  let result = {}

  if (request.status >= 200 && request.status < 400) {
    try {
      json = request.response
      result = JSON.parse(json)
    } catch (e) {
      console.log('something went wrong with json')
      alert('取得JSON錯誤, 請再試一次')
      return
    }

    switch (result.prize) {
      case 'FIRST':
        console.log(result.prize)
        changePage('first', '恭喜你中頭獎了！日本東京來回雙人遊！')
        break
      case 'SECOND':
        console.log(result.prize)
        changePage('second', '二獎！90 吋電視一台！')
        break
      case 'THIRD':
        console.log(result.prize)
        changePage('third', '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，PEKO!')
        break
      case 'NONE':
        console.log(result.prize)
        changePage('none', '銘謝惠顧')
        break
      default:
        console.log('oops, something went wrong')
        alert('系統不穩定，請再試一次')
    }
  } else {
    console.log('Server error responses')
    alert('系統不穩定，請再試一次')
  }
})

request.addEventListener('error', (e) => {
  console.log('Window object 發生錯誤')
  alert('系統不穩定，請再試一次')
})

function changePage(prize, str) {
  const container = document.querySelector('.container')
  container.classList.remove('container')
  container.classList.add(`container-${prize}`)
  if (prize === 'none') {
    container.innerHTML = `
    <div class="draw-result">
      <div class="draw-title">
      ${str}
      </div>
      <button class="btn-draw">我要再抽一次</button>
    </div>
  `
  } else {
    container.innerHTML = `
    <div class="draw-result white-block">
      <div class="draw-title">
      ${str}
      </div>
      <button class="btn-draw">我要再抽一次</button>
    </div>
  `
  }

  const drawAgainBtn = document.querySelector('.draw-result .btn-draw')
  drawAgainBtn.addEventListener('click', (e) => {
    container.classList.remove(`container-${prize}`)
    container.classList.add('container')
    container.innerHTML = `
    <div class="info">
      <h1>2020 夏日輕盈特賞！ 抽獎活動辦法</h1>

      <div class="info-content">

        <div class="date">
        <p class="title">活動期間：</p>
        <p class="content">2020/06/01~2020/07/01</p>
        </div>

        <div class="underline"></div>

        <div class="description">
          <p class="title">活動說明：</p>
          <p class="content">
            今天老闆佛心來著決定給大家發獎勵，有看有機會，沒看只能幫QQ！
            只要在店內消費滿1000000元即有機會獲得 - 頭獎日本東京來回雙人遊！
          </p>
        </div>
        <div class="underline"></div>

        <div class="prize">
          <p class="title">獎&emsp;&emsp;品：</p>
          <p class="content">
            ❤ 頭獎一名：日本東京來回雙人遊(市價14990元)<br>
            ❤ 貳獎三名：90 吋電視一台(市價5990元)<br>
            ❤ 參獎十名：知名 YouTuber 簽名握手會入場券一張(市價1500元)
          </p>
        </div>
        <div class="underline"></div>

        <button class="btn-draw">我要抽獎</button>

      </div>
    </div>
    `
    const drawBtn = document.querySelector('.info .btn-draw')
    drawBtn.addEventListener('click', (e) => {
      request.open('GET', url, true)
      request.send()
    })
  })
}
