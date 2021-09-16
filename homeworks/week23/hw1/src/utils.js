export function saveTodosIntoLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}
