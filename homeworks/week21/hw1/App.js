import { TodoItem, TodoTitle } from "./components";
import React, { useState, useRef, useEffect } from "react";

function saveTodosIntoLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function App() {
  const idRef = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData && todoData !== "[]") {
      todoData = JSON.parse(todoData);
      idRef.current = todoData[0].id + 1;
      return todoData;
    }
    todoData = [];
    return todoData;
  });
  const [values, setValues] = useState("");
  const [filter, setFilters] = useState("all");

  useEffect(() => {
    saveTodosIntoLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = (e) => {
    if (e.key !== "Enter") return;
    setTodos([
      {
        id: idRef.current,
        content: values,
        isDone: false,
      },
      ...todos,
    ]);
    e.target.value = "";
    setValues(""); // 為什麼不會重新 render
    console.log(values);
    idRef.current++;
  };
  const handleInputChange = (e) => {
    setValues(e.target.value);
  };
  const handleButtonClick = (e) => {
    if (e.target.classList.contains("all-btn")) {
      setFilters("all");
    }
    if (e.target.classList.contains("completed-btn")) {
      setFilters("completed");
    }
    if (e.target.classList.contains("umcompleted-btn")) {
      setFilters("umcompleted");
    }
    if (e.target.classList.contains("clean-btn")) {
      setFilters("clean");
      setTodos([]);
    }
  };
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleIsDoneButton = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  return (
    <div className="app">
      <TodoTitle
        className="title-block"
        title="Todo List"
        handleAddTodo={handleAddTodo}
        handleInputChange={handleInputChange}
        handleButtonClick={handleButtonClick}
      />
      {todos
        .filter((todo) =>
          filter === "all"
            ? todo
            : filter === "completed"
            ? todo.isDone
            : filter === "umcompleted"
            ? !todo.isDone
            : todo
        )
        .map((todo) => (
          <TodoItem
            key={todo.id}
            content={todo.content}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleIsDoneButton={handleIsDoneButton}
          />
        ))}
    </div>
  );
}

export default App;
