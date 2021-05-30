let count = 0 // 紀錄累計新增的 todo 數量, 作為 todo id

document.addEventListener('DOMContentLoaded', (e) => {
  if (localStorage.getItem('lastList')) {
    count = localStorage.getItem('lastList')
    readStorage()
  } else {
    localStorage.setItem('todoList', '[]')
    localStorage.setItem('lastList', '')
  }
})

document.querySelector('.wrapper').addEventListener('click', (e) => {
  if (e.target.id === 'submit') {
    const input = document.querySelector('.top input')
    const [value] = input.value
    if (!value) return
    addStorage(value)
    addTodo(value)
    return
  }
  if (e.target.className === 'delete') { // 刪除 todo list
    e.target.parentElement.remove()
    const todoId = e.target.parentElement.querySelector('p').dataset.id
    delStorage(Number(todoId))
    return
  }
  if (e.target.type === 'checkbox') { // 對 todo list 加上刪除線
    const p = e.target.parentElement.querySelector('p')
    p.classList.toggle('strikethrough')
    const list = document.querySelector('.list')
    if (e.target.checked) {
      list.append(e.target.parentElement) // 把打勾的 list 放到最後面
      strikethroughStorage(Number(p.dataset.id), true)
    } else {
      list.prepend(e.target.parentElement) // 把取消打勾的 list 放到最前面
      strikethroughStorage(Number(p.dataset.id), false)
    }
  }
})

function readStorage() {
  const json = JSON.parse(localStorage.getItem('todoList'))
  json.forEach((each) => {
    const list = document.querySelector('.list')
    const div = document.createElement('div')
    div.classList.add('todo')
    if (each.isFinished === true) { // 預設加上刪除線和打勾、放在 list 最後面
      div.innerHTML = `
        <input type="checkbox" checked>
        <p class="strikethrough" data-id='${each.id}'>${escapeHtml(each.todo)}</p>
        <button class="delete">delete</button>
      `
      list.append(div)
    } else { // 預設沒有加上刪除線、沒有打勾
      div.innerHTML = `
        <input type="checkbox">
        <p data-id='${each.id}'>${escapeHtml(each.todo)}</p>
        <button class="delete">delete</button>
       `
      list.prepend(div) // 最新新增的 todo 會放在最前面
    }
  })
}

function addTodo(value) {
  const list = document.querySelector('.list')
  const div = document.createElement('div')
  div.classList.add('todo')
  div.innerHTML = `
    <input type="checkbox">
    <p data-id='${count}'>${escapeHtml(value)}</p>
    <button class="delete">delete</button>
  `
  list.prepend(div) // 最新新增的 todo 會放在最前面
}

function addStorage(value) {
  count++
  const json = JSON.parse(localStorage.getItem('todoList'))
  const obj = {}
  obj.id = count
  obj.todo = escapeHtml(value)
  obj.isFinished = false
  json.push(obj)
  localStorage.setItem('todoList', JSON.stringify(json))
  localStorage.setItem('lastList', count)
}

function delStorage(id) {
  const json = JSON.parse(localStorage.getItem('todoList'))
  const newJson = json.filter((each) => {
    if (each.id !== id) {
      return each
    } else {
      return null
    }
  })
  localStorage.setItem('todoList', JSON.stringify(newJson))
}

function strikethroughStorage(id, boolean) {
  const json = JSON.parse(localStorage.getItem('todoList'))
  const newJson = json.map((each) => {
    if (each.id === id) {
      each.isFinished = boolean
      return each
    } else {
      return each
    }
  })
  localStorage.setItem('todoList', JSON.stringify(newJson))
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
