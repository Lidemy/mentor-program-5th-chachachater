document.querySelector('.button').addEventListener('click', (e) => {
  e.preventDefault()
  let valid = true
  let validRadio = false
  const required = document.querySelectorAll('.required')

  // 把 Nodelist 變成真正的 array↓
  const requiredArr = [...required]
  const value = {}
  const advice = document.querySelector('input[id="advice"]')
  value[advice.id] = advice.value
  for (const each of requiredArr) {
    const text = each.querySelector('input[type="text"]')
    const email = each.querySelector('input[type="email"]')
    const number = each.querySelector('input[type="number"]')
    const radios = each.querySelectorAll('input[type="radio"]')

    if (text) { // 處理 input[type="text"]
      if (!text.value) {
        value[text.id] = text.value
        valid = false
        each.querySelector('.notice').classList.remove('hide')
      } else {
        value[text.id] = text.value
        each.querySelector('.notice').classList.add('hide')
      }
    } else if (email) { // 處理 input[type="email"]
      if (!email.value) {
        value[email.id] = email.value
        valid = false
        each.querySelector('.notice').classList.remove('hide')
      } else {
        value[email.id] = email.value
        each.querySelector('.notice').classList.add('hide')
      }
    } else if (number) { // 處理 input[type="number"]
      if (!number.value) {
        value[number.id] = number.value
        valid = false
        each.querySelector('.notice').classList.remove('hide')
      } else {
        value[number.id] = number.value
        each.querySelector('.notice').classList.add('hide')
      }
    } else if (radios.length) { // 處理 input[type="radio"]
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
  if (valid && validRadio) {
    alert(
      `
      暱稱:${value.nickname}
      電子郵件:${value.email}
      手機號碼:${value['phone-number']}
      報名類型:${value['type-of-application']}
      怎麼知道這個活動的？${value.question}
      對活動的一些建議:${value.advice}
      `
    )
  }
})
