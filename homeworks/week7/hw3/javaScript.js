let count = 0

document.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('lastList')) {
    count = localStorage.getItem('lastList')
    readStorage()
  } else {
    localStorage.setItem('todoList', '{}')
    localStorage.setItem('lastList', '')
  }
})

document.querySelector('.wrapper').addEventListener('click', (e) => {
  if (e.target.id === 'submit') {
    const input = document.querySelector('.top input')
    const [value] = input.value
    if (!(value)) return
    addList(value)
    addStorage(value)
    return
  }

  // 刪除 todo list
  if (e.target.className === 'delete') {
    e.target.parentElement.remove()
    delSingleList(e.target.parentElement.querySelector('p').innerText)
    return
  }

  // 對 todo list 加上刪除線
  if (e.target.type === 'checkbox') {
    if (e.target.checked) {
      const del = e.target.parentElement.querySelector('p')
      del.classList.toggle('del')
      const list = document.querySelector('.list')
      list.append(e.target.parentElement) // 把打勾的 list 放到最後面
      listBreakStorage(del.innerText, true)
    } else {
      const del = e.target.parentElement.querySelector('p')
      del.classList.toggle('del')
      const list = document.querySelector('.list')
      list.prepend(e.target.parentElement) // 把取消打勾的 list 放到最前面
      listBreakStorage(del.innerText, false)
    }
  }
})

function readStorage() {
  const json = JSON.parse(localStorage.getItem('todoList'))
  for (const key in json) {
    if (json[key][1]) { // 預設加上刪除線和打勾、放在 list 最後面
      const list = document.querySelector('.list')
      const createDiv = document.createElement('div')
      createDiv.classList.add('single')
      createDiv.innerHTML = `
        <input type="checkbox" checked>
        <p class="del">${escapeHtml(json[key][0])}</p>
        <button class="delete">delete</button>
      `
      list.append(createDiv)
    } else { // 預設沒有加上刪除線、沒有打勾
      addList(json[key][0])
    }
  }
}

function addList(value) {
  const list = document.querySelector('.list')
  const createDiv = document.createElement('div')
  createDiv.classList.add('single')
  createDiv.innerHTML = `
    <input type="checkbox">
    <p>${escapeHtml(value)}</p>
    <button class="delete">delete</button>
  `
  list.prepend(createDiv)
}

function addStorage(value) {
  count++
  const json = JSON.parse(localStorage.getItem('todoList'))
  json[`${count}`] = [escapeHtml(value), false]
  localStorage.setItem('todoList', JSON.stringify(json))
  localStorage.setItem('lastList', count)
}

function delSingleList(value) {
  const json = JSON.parse(localStorage.getItem('todoList'))
  for (const key in json) {
    if (json[key][0] === value) {
      delete json[key]
      localStorage.setItem('todoList', JSON.stringify(json))
    }
  }
}

function listBreakStorage(value, boolean) {
  const json = JSON.parse(localStorage.getItem('todoList'))
  for (const key in json) {
    if (json[key][0] === value) {
      json[key][1] = boolean
    }
  }
  localStorage.setItem('todoList', JSON.stringify(json))
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
