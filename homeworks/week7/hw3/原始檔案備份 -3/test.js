// let count = 0

// document.addEventListener('DOMContentLoaded', function (e) {
//   if (localStorage.getItem('lastList')) {
//     count = localStorage.getItem('lastList')
//     readStorage()
//   }
//   else {
//     localStorage.setItem('todoList', '{}')
//   }

// })

// document.querySelector('.wrapper').addEventListener('click', function (e) {
//   console.log(e.target.type)

//   if (e.target.id === 'submit') {
//     const input = document.querySelector('.input input')
//     let value = input.value
//     if (!(value)) return
//     addList(value)
//     addStorage(value)
//   }

//   // 刪除 todo list
//   if (e.target.className === 'delete') {
//     e.target.parentElement.remove()
//     delSingleList(e.target.parentElement.querySelector('p').innerText)
//   }

//   // 對 todo list 加上刪除線
//   if (e.target.type === 'checkbox') {
//     let del = e.target.parentElement.querySelector('p')
//     del.classList.toggle('del')

//     const list = document.querySelector('.list')
//     list.append( e.target.parentElement)
//   }
// })

// function readStorage() {
//   let json = JSON.parse(localStorage.getItem('todoList'))
//   for (key in json) {
//     // const list = document.querySelector('.list')
//     // const addDiv = document.createElement('div')
//     // addDiv.classList.add('single')
//     // addDiv.innerHTML = `
//     //   <input type="checkbox">
//     //   <p>${escapeHtml(json[key])}</p>
//     //   <button class="delete">delete</button>
//     // `
//     // list.prepend(addDiv)
//     addList(json[key])
//   }
// }

// function addList(value) {
//   const list = document.querySelector('.list')
//   const addDiv = document.createElement('div')
//   addDiv.classList.add('single')
//   addDiv.innerHTML = `
//     <input type="checkbox">
//     <p>${escapeHtml(value)}</p>
//     <button class="delete">delete</button>
//   `
//   list.prepend(addDiv)
// }

// function addStorage(value) {
//   count++

//   let json = JSON.parse(localStorage.getItem('todoList'))
//   json[`${count}`] = escapeHtml(value)
//   localStorage.setItem('todoList', JSON.stringify(json))
//   localStorage.setItem('lastList', count)
// }

// function delSingleList(value) {
//   const json = JSON.parse(localStorage.getItem('todoList'))

//   for (key in json) {
//     if (json[key] === value) {
//       delete json[key]
//       localStorage.setItem('todoList', JSON.stringify(json))
//     }
//   }
// }

// // function listBreakList(value) {
// //   const json = JSON.parse(localStorage.getItem('todoList'))

// //   for (key in json) {
// //     if (json[key] === value) {
// //       delete json[key]
// //       localStorage.setItem('todoList', JSON.stringify(json))
// //     }
// //   }
// }

// function escapeHtml(unsafe) {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }
