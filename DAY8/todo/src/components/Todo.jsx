import { useState } from "react";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  function onInputChange(event) {
    setInput(event.target.value);
  }
  function onAdd() {
    setTodos([...todos, input]);
    setInput("");
  }

  function onDelete(index) {
    const filterTodos = todos.filter((_, i) => {
      return i != index;
    });

    setTodos(filterTodos);
  }

  return (
    <div className="bg-success">
      <h1 className="text-light ">ToDo</h1>
      <input
        type="text"
        placeholder="add a task"
        onChange={onInputChange}
        value={input}
      />
      <button onClick={onAdd}>Add Task</button>

      {todos.map((list, index) => (
        <li className="text-light p-5 d-flex justify-content-center bg-secondary m-5">
          <p className="m-4"> {list} </p>
          <button
            onClick={function () {
              onDelete(index);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}
