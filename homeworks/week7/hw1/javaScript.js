document.querySelector('.button').addEventListener('click', (e) => {
  e.preventDefault()
  let validText = true
  let validRadio = false
  const required = document.querySelectorAll('.required')
  // 把 Nodelist 變成真正的 array↓
  const requiredArr = [...required]
  const value = {}

  for (const each of requiredArr) {
    const text = each.querySelector('input[type="text"]')
    const radios = each.querySelectorAll('input[type="radio"]')

    // 處理 input[type="text"]↓
    if (text) {
      if (!text.value) {
        value[text.id] = text.value
        validText = false
        each.querySelector('.notice').classList.remove('hide')
      } else {
        value[text.id] = text.value
        each.querySelector('.notice').classList.add('hide')
      }
    } else if (radios.length) { // 處理 input[type="radio"]↓
      for (const radio of radios) {
        if (radio.checked === true) {
          validRadio = true
          value[radio.name] = radio.id
          each.lastElementChild.lastElementChild.classList.add('hide')
          break
        } else {
          each.lastElementChild.lastElementChild.classList.remove('hide')
        }
      }
    } else { // 如果要對表單內容做新增(type=text, radio 以外)可以從這裡開始放↓
      console.log('not input text or input radio')
    }
  }
  if (validText && validRadio) {
    alert(JSON.stringify(value))
  }
})
