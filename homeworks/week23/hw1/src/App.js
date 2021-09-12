import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, selectFilter } from "./redux/selectors";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clean,
  setFilter,
} from "./redux/actions";
import { saveTodosIntoLocalStorage } from "./utils";

export default function App() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState("");
  useEffect(() => {
    saveTodosIntoLocalStorage(todos);
  }, [todos]);
  const handleAddTodo = (e) => {
    if (e.key !== "Enter") return;
    dispatch(addTodo(inputValues));
    setInputValues("");
  };
  return (
    <div className="app">
      <AddTodo
        className="title-block"
        title="Todo List"
        inputValues={inputValues}
        handleAddTodo={handleAddTodo}
        handleInputChange={(e) => {
          setInputValues(e.target.value);
        }}
        filterAllTodo={() => {
          dispatch(setFilter("all"));
        }}
        filterFinishedTodo={() => {
          dispatch(setFilter("finished"));
        }}
        filterUnFinishedTodo={() => {
          dispatch(setFilter("unfinished"));
        }}
        cleanTodo={() => {
          dispatch(clean());
        }}
      />
      {todos
        .filter((todo) =>
          filter[0] === "all"
            ? todo
            : filter[0] === "finished"
            ? todo.isDone
            : filter[0] === "unfinished"
            ? !todo.isDone
            : todo
        )
        .map((todo) => (
          <TodoList
            key={todo.id}
            content={todo.content}
            todo={todo}
            handleDeleteTodo={(id) => {
              dispatch(deleteTodo(id));
            }}
            handleIsDoneButton={(id) => {
              dispatch(toggleTodo(id));
            }}
          />
        ))}
    </div>
  );
}
