# W23HW2 簡答題

## 為什麼我們需要 Redux？

當 React 的子層 component 彼此之間的一些 state 需要共用而把需要共用的 state 放到父層 component 之中，當需要共用的 state 越多，會造成父層 component 擁有許多 state 而造成管理上的不便。當 state 需要被許多 component 共用時，便適合使用 Redux 來管理它。

用比喻來說，我覺得 Redux 類似事件代理人，負責總管 state。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

### Redux 是什麼

A Predictable State Container for JS Apps.（一個可預測的 state 管理容器）

### Actions
Actions 是從應用程式傳遞資料到 store 的 payload。它們是 store **唯一**的資訊來源。使用 `dispatch()` 來把它們傳遞到 store。

actions 是一個物件，搭配 Action Creator(回傳 action 的函式)來使用，例如：
```javascript=
function addTodo(text) {
  return { type: ADD_TODO, text }
}
```

### Reducer
reducer 是一個 pure function，它接收初始的 state 和一個 action，然後決定 state 要如何去應對改變，例如：

```javascript=
function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos, {
            id: todoId++,
            content: action.payload.content,
            isDone: false
          }
        ]
      }
    }
    case TOGGLE_TODO: {
      return {
        todos: state.todos.map(each => {
          if (each.id === action.payload.id) {
            return {
              ...each,
              isDone: !each.isDone
            }
          }
          return each
        })

      }
    }
    case DELETE_TODO: {
      return {
        todos: state.todos.filter(each => each.id !== action.payload.id)
      }
    }
    case CLEAN: {
      return {
        todos: []
      }
    }
    default: {
      return state
    }
  }
}

```

### Store
Store 是一個物件(state tree)，負責管理 state 以及提供一些可使用的函式，例如：

* 藉由 `getState()` 獲取 state
* 允許藉由 `dispatch(action)` 來更新 state
* 藉由 `subscribe(listener)` 註冊 listener


```javascript=
createStore(
  rootReducer
)
```


### 資料流

Redux 是單向資料流，(在 UI )使用者按下"Add Todo" > `dispatch(addTodo('吃飯'))` > Reducer 接收到 action 並改變 state（如下）
```javascript=
function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos, {
            id: todoId++,
            content: action.payload.content,
            isDone: false
          }
        ]
      }
    }
```


## 該怎麼把 React 跟 Redux 串起來？

使用 react-redux 套件，在需要共用 state 的 component 的父層，用 `<Provider store={store}>`包住，裡面的 component 便可以用 `useSelector()` 來取得 state，用`useDispatch()` 來傳送 action。