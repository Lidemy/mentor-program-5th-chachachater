checkToken(getJson)

$('.input-block input').on('keypress', (e) => {
  if (e.keyCode === 13) {
    const dataId = getRandomInt(10000)
    const inputVal = $(e.target).val()
    if (!inputVal) return
    addTodo(inputVal, dataId, false)
    $(e.target).val('')
  }
})

$('.manage-block').on('click', (e) => {
  if ($(e.target).hasClass('btn-save')) {
    const p = $('.todo-block > div p')
    const json = {}
    json.token = localStorage.getItem('token')
    json.todo = []
    p.each((index, element) => {
      json.todo.push(getSavedData(index, element))
    })
    console.log(JSON.stringify(json))
    sendJson(JSON.stringify(json))
  }
  if ($(e.target).hasClass('btn-clear')) {
    const allTodo = $('.todo')
    allTodo.each((index, element) => $(element).remove())
  }
  if ($(e.target).hasClass('btn-unfinished')) {
    $('.unfinished-block').fadeToggle()
  }
  if ($(e.target).hasClass('btn-finished')) {
    $('.finished-block').fadeToggle()
  }
  if ($(e.target).hasClass('btn-all')) {
    $('.todo-block').fadeToggle()
  }
})

$('.list').on('click', (e) => {
  const todos = getTodos($(e.target).parent())

  if ($(e.target).hasClass('btn-checked')) {
    todos.each((index, element) => {
      if (index !== 0) toggleTodo(element)
      toggleStrikethrough(element)
    })
  }
  if ($(e.target).hasClass('btn-delete')) todos.each((index, element) => $(element).parent().parent().remove())
  // 同步修改 'todo-block', 'unfinished-block', 'finished-block' 裡面的 Todo
  if ($(e.target).hasClass('content') && $(e.target).parent().parent().hasClass('todo-block')) setEvtList(e.target, 0, todos)
  if ($(e.target).hasClass('content') && $(e.target).parent().parent().hasClass('unfinished-block')) setEvtList(e.target, 1, todos)
  if ($(e.target).hasClass('content') && $(e.target).parent().parent().hasClass('finished-block')) setEvtList(e.target, 2, todos)
})

function checkToken(cb) {
  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.setItem('token', getRandomToken())
    const json = {
      token: localStorage.getItem('token'),
      todo: []
    }
    addToken(JSON.stringify(json))
    return
  }
  cb(token, addTodo)
}

function addToken(data) { // data 已經用 JSON.stringfy() 做轉換
  const url = 'http://mentor-program.co/mtr04group3/Selena/week12/hw2/api_handle_add_todo.php'
  $.post(url, data)
    .done((response) => {
      if (!response.success) {
        alert(response.message)
        console.log(response)
        return
      }
      alert('已建立新的 Todo list')
    })
    .fail((err) => {
      alert('Oops, something went wrong:', err)
      console.log(err)
    })
}

function getJson(token, doneCb) {
  const url = `http://mentor-program.co/mtr04group3/Selena/week12/hw2/api_todo.php?token=${token}`
  $.get(url)
    .done((response) => {
      console.log('response', response)
      response.reverse().forEach((each) => doneCb(each.content, each.data_id, each.is_done)) // 因為 doneCb 是用 prepend() 來把 Todo 加上去的，所以這邊要先把陣列順序反轉再做 prepend()，才可以保持順序的一致性
    })
    .fail((err) => {
      alert('Oops, something went wrong:', err)
      console.log(err)
    })
}

function sendJson(data) { // data 已經用 JSON.stringfy() 做轉換
  const url = 'http://mentor-program.co/mtr04group3/Selena/week12/hw2/api_handle_add_todo.php'
  $.post(url, data)
    .done((response) => {
      console.log(response)
      if (!response.success) {
        alert(response.message)
        return
      }
      alert(response.message)
    })
    .fail((err) => {
      alert('Oops, something went wrong:', err)
      console.log(err)
    })
}

function getSavedData(index, element) {
  const data = {}

  data.data_id = $(element).attr('data-id')
  data.content = element.innerText
  if ($(element).hasClass('strikethrough')) {
    data.is_done = 1
  } else {
    data.is_done = 0
  }
  return data
}

function addTodo(value, dataId, isDone) {
  const templateTodo = `
    <div class="todo $blockType $toggleHide">
      <div class="overflow-auto d-flex flex-row 
                  justify-content-between align-items-center bd-highlight 
                  bg-dark bg-gradient text-white mb-3 px-3">
        <button class="btn-checked btn btn-outline-light btn-sm material-icons-outlined">
          check_circle
        </button>
        <p class="content $strikethrough flex-fill m-0 px-3" contenteditable="true" data-id="$dataId">$value</p>
        <button class="btn-delete btn btn-outline-light btn-sm material-icons-outlined">
          delete
        </button>
      </div>
    </div>`
  const blockDivArr = $('.list > div > div')
  const template = document.createElement('template')
  $(template).html(
    templateTodo
      .replace('$blockType', 'todo-block')
      .replace('$toggleHide', '')
      .replace('$strikethrough', isDone ? 'strikethrough' : '')
      .replace('$dataId', escapeHtml(dataId.toString()))
      .replace('$value', escapeHtml(value))
  )
  $(blockDivArr[0]).prepend(template.content)

  $(template).html(
    templateTodo
      .replace('$blockType', 'unfinished-block')
      .replace('$toggleHide', isDone ? 'hide' : '')
      .replace('$strikethrough', isDone ? 'strikethrough' : '')
      .replace('$dataId', escapeHtml(dataId.toString()))
      .replace('$value', escapeHtml(value))
  )
  $(blockDivArr[1]).prepend(template.content)

  $(template).html(
    templateTodo
      .replace('$blockType', 'finished-block')
      .replace('$toggleHide', isDone ? '' : 'hide')
      .replace('$strikethrough', isDone ? 'strikethrough' : '')
      .replace('$dataId', escapeHtml(dataId.toString()))
      .replace('$value', escapeHtml(value))
  )
  $(blockDivArr[2]).prepend(template.content)
}

function getTodos(element) {
  const dataId = $(element).find('p').attr('data-id')
  const todos = $(`p[data-id="${dataId}"]`)
  return todos
}

function toggleTodo(element) {
  $(element).parent().parent().fadeToggle()
}

function toggleStrikethrough(element) {
  $(element).toggleClass('strikethrough')
}

function setEvtList(element, skipedIndex, todos) {
  $(element).on('keyup', (e) => {
    // const text = $(element).text() // jquery 的 .text() 不會同步更新空行
    const text = element.innerText
    todos.each((index, element) => {
      if (index !== skipedIndex) changeTodo(text, element)
    })
  })
}

function changeTodo(text, element) {
  // $(element).text(text)
  element.innerText = escapeHtml(text)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function getRandomToken() {
  let str = ''
  for (let i = 0; i < 10; i += 1) {
    const number = 48 + Math.floor(Math.random() * 43)
    str += String.fromCharCode(number)
  }
  return str
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&quot;')
    .replace(/'/g, '&#039;')
}
