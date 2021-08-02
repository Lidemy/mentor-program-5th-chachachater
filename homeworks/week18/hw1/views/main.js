// burger nav
const burgerBox = document.querySelector('input[type="checkbox"]')
const burger = document.querySelector('.burger')
burgerBox.addEventListener('click', function (e) {
  burgerChange(burger)
})
function burgerChange(x) {
  x.classList.toggle('change')
  console.log('click')
}

// faq
const element = document.querySelector('.question')
if (element) toggleFaq(element)
function toggleFaq(element) {
  element.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'H3') return
    e.target.nextElementSibling.classList.toggle('show')
  })
}

// draw
const drawBtn = document.querySelector('.info .btn-draw')
if (drawBtn) getDraw(drawBtn)
function getDraw(element) {
  const request = new XMLHttpRequest()
  const url = '/handle-draw'
  drawBtn.addEventListener('click', (e) => {
    request.open('GET', url, true)
    request.send()
  })

  request.addEventListener('load', (e) => {
    let json = ''
    let result = {}
    try {
      json = request.response
      result = JSON.parse(json)
    } catch (e) {
      console.log('something went wrong with json')
      alert('取得JSON錯誤, 請再試一次')
      return
    }
    changePage(request, url, result.description)
  })

  request.addEventListener('error', (e) => {
    console.log('Window object 發生錯誤')
    alert('系統不穩定，請再試一次')
  })
}

function changePage(request, url, str) {
  const container = document.querySelector('.container')
  container.classList.remove('container')
  container.classList.add(`container-prize`)
  container.innerHTML = `
      <div class="draw-result">
        <div class="draw-title">
        ${str}
        </div>
        <button class="btn-draw">我要再抽一次</button>
      </div>
      `

  const drawAgainBtn = document.querySelector('.draw-result .btn-draw')
  drawAgainBtn.addEventListener('click', (e) => {
    window.history.back()
    const drawBtn = document.querySelector('.info .btn-draw')
    drawBtn.addEventListener('click', (e) => {
      request.open('GET', url, true)
      request.send()
    })
  })
}