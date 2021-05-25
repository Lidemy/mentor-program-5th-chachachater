// // 加上暫存 storage 的功能
// // document.addEventListener('DOMContentLoaded', function (e) {
// //   let listEle = document.querySelector('.list')
// //   let patt = /singleList/

// //   for (let i = 0; i < localStorage.length; i++) {
// //     // 從 local storage 中找到 todolist 然後加進去清單裡面
// //     if (localStorage.key(i).match(patt)) {
// //       const addDiv = document.createElement('div')
// //       addDiv.classList.add('single')
// //       addDiv.innerHTML = `
// //         <input type="checkbox">
// //         <p>${localStorage.getItem(localStorage.key(i))}</p>
// //         <button class="delete">delete</button>
// //       `
// //       listEle.prepend(addDiv)
// //     }
// //   }
// //   count = localStorage.getItem('lastList')
// //   lastList = localStorage.getItem('lastList')

// //   if (!lastList) {
// //     count = 0
// //     lastList = 0
// //   }

// // })

// let count = 0
// count = localStorage.getItem('lastList')

// document.querySelector('.wrapper').addEventListener('click', function (e) {
//   console.log(e.target.parentElement.querySelector('p').innerText)

//   if (e.target.id === 'submit') {
//     const input = document.querySelector('.input input')
//     let value = input.value
//     if (!(value)) return

//     const list = document.querySelector('.list')
//     const addDiv = document.createElement('div')
//     addDiv.classList.add('single')
//     addDiv.innerHTML = `
//       <input type="checkbox">
//       <p>${escapeHtml(value)}</p>
//       <button class="delete">delete</button>
//     `
//     list.prepend(addDiv)

//     // 加上暫存 storage 的功能
//     // localStorage.setItem(`singleList${count}`, escapeHtml(value))
//     // localStorage.setItem(`lastList`, lastList)
//     // count++
//     // lastList = count
//     // console.log(count)
//   }

//   // 刪除 todo list
//   if (e.target.className === 'delete') {
//     e.target.parentElement.remove()
//     // localStorage.removeItem()
//   }

//   // 對 todo list 加上刪除線
//   if (e.target.type === 'checkbox') {
//     let del = e.target.parentElement.querySelector('p')
//     del.classList.toggle('del')
//   }

// })

// function escapeHtml(unsafe) {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// function readStorage () {
//   const todoList = localStorage.getItem('todoList')

//   for (each of todoList) {
//     const list = document.querySelector('.list')
//     const addDiv = document.createElement('div')
//     addDiv.classList.add('single')
//     addDiv.innerHTML = `
//       <input type="checkbox">
//       <p>${escapeHtml(each.value)}</p>
//       <button class="delete">delete</button>
//     `
//     list.prepend(addDiv)
//   }
// }

// function addStorage (value) {
//   const obj = {}
//   count++
//   obj[id, value] = [count, value]
//   const newList = localStorage.getItem('todoList').push(obj)
//   localStorage.setItem('todoList',newList)
// }

// function delSingleList (value) {
//   const getList = localStorage.getItem('todoList')
//   const keep = getList.filter(each => each.value !== value)
//   localStorage.removeItem('todoList')
//   localStorage.setItem('todoList',keep)
// }

// function addList (value) {
//   if (!(value)) return

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

// // document.querySelector('.top').addEventListener('click', function (e) {
// //   console.log('hi,test')

// // })
