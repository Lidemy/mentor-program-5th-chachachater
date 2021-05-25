// function checkInput(domElement) {
//   const idName = domElement.id
//   const del = document.querySelector(`#${idName}+p`)

//   if (domElement.value && del) {
//     del.remove()
//     return
//   }
//   if (domElement.value || document.querySelector(`#${idName}+p`)) {
//     return
//   }
//   // if (document.querySelector(`#${idName}+p`)) {
//   //   return
//   // }
//   if (!(domElement.value)) {
//     const element = document.createElement('p')
//     domElement.insertAdjacentElement('afterend', element)
//     const getElement = document.querySelector(`#${idName}+p`)
//     const add = document.createTextNode('Invalid input')
//     getElement.appendChild(add)
//     getElement.classList.add('checkInput')
//     return
//   }
// }

// function checkRadioInput(domElement1, domElement2) {
//   const del = document.querySelector(`.section__type-of-application p`)
//   const check1 = domElement1.checked
//   const check2 = domElement2.checked
//   // 處理邏輯, radio input 需要勾選
//   if ((check1 || check2) && del) {
//     del.remove()
//     return
//   }
//   if (check1 || check2) {
//     return
//   }
//   if (del) {
//     return
//   }
//   if (!(check1 && check2)) {
//     const element = document.createElement('p')
//     const parentElement = document.querySelector('.section__type-of-application')
//     parentElement.appendChild(element)
//     const getElement = document.querySelector(`.section__type-of-application p`)
//     const add = document.createTextNode('Invalid input')
//     getElement.appendChild(add)
//     getElement.classList.add('checkInput')
//     return
//   }
// }

// document.querySelector('form').addEventListener('submit', function (e) {
//   e.preventDefault()

//   // 在欄位的 input 下方顯示紅字提醒沒填的欄位
//   const nickname = document.getElementById(`nickname`)
//   const email = document.getElementById(`email`)
//   const phoneNumber = document.getElementById(`phone-number`)
//   const qusetion = document.getElementById(`qusetion`)
//   checkInput(nickname)
//   checkInput(email)
//   checkInput(phoneNumber)
//   checkInput(qusetion)

//   const application1 = document.getElementById("type1")
//   const application2 = document.getElementById("type2")
//   checkRadioInput(application1, application2)

//   // 跳出一個 alert 展示使用者填寫的資料。
//   let application = ''
//   if (application1.checked) {
//     application += application1.value
//   }
//   if (application2.checked) {
//     application += application2.value
//   }
//   let otherAns = ''
//   const other = document.getElementById("other")
//   if (other) {
//     otherAns += other.value
//   }

//   if (nickname.value && email.value && phoneNumber.value && qusetion.value && (application1.checked || application2.checked)) {
//     alert(`
//     Your application is:\n
//     暱稱: ${nickname.value}\n
//     電子郵件: ${email.value}\n
//     手機號碼: ${phoneNumber.value}\n
//     報名類型: ${application}\n
//     怎麼知道這個活動的? ${qusetion.value}\n
//     對活動的一些建議: ${otherAns}
//     `)
//   }

// })
