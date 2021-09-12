import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CLEAN } from "../actionTypes";

let todoId = 0;
const getLocalStorage = () => {
  let todoData = window.localStorage.getItem("todos") || "";
  if (todoData && todoData !== "[]") {
    todoData = JSON.parse(todoData);
    todoId = todoData[todoData.length - 1].id + 1;
    return todoData;
  }
  todoData = [];
  return todoData;
};
const initialState = {
  todos: getLocalStorage(),
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false,
          },
        ],
      };
    }
    case TOGGLE_TODO: {
      return {
        todos: state.todos.map((each) => {
          if (each.id === action.payload.id) {
            return {
              ...each,
              isDone: !each.isDone,
            };
          }
          return each;
        }),
      };
    }
    case DELETE_TODO: {
      return {
        todos: state.todos.filter((each) => each.id !== action.payload.id),
      };
    }
    case CLEAN: {
      return {
        todos: [],
      };
    }
    default: {
      return state;
    }
  }
}
