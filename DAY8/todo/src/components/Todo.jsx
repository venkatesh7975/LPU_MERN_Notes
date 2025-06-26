import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function onInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // prevent page reload on submit

    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: input, checked: false }]);
    }

    setInput("");
  }

  function onDelete(index) {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  }

  function onEdit(index) {
    setInput(todos[index].text);
    setEditIndex(index);
  }

  function onToggleCheck(index) {
    const updated = [...todos];
    updated[index].checked = !updated[index].checked;
    setTodos(updated);
  }

  return (
    <div className="container my-5 p-4 rounded bg-dark text-light shadow">
      <h1 className="text-center mb-4">📝 ToDo App</h1>

      {/* Form wraps input and submit button */}
      <form className="input-group mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Add a task..."
          value={input}
          onChange={onInputChange}
        />
        <button type="submit" className="btn btn-success">
          {editIndex !== null ? (
            <i className="fas fa-edit"></i>
          ) : (
            <i className="fas fa-plus"></i>
          )}
        </button>
      </form>

      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-light"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={todo.checked}
                onChange={() => onToggleCheck(index)}
              />
              <span
                className={`fs-5 ${
                  todo.checked ? "text-decoration-line-through text-muted" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <div>
              <i
                className="fas fa-edit text-warning mx-2"
                role="button"
                title="Edit"
                onClick={() => onEdit(index)}
              ></i>
              <i
                className="fas fa-trash-alt text-danger mx-2"
                role="button"
                title="Delete"
                onClick={() => onDelete(index)}
              ></i>
              <i
                className={`fas fa-check-circle mx-2 ${
                  todo.checked ? "text-info" : "text-white-50"
                }`}
                role="button"
                title="Mark as Done"
                onClick={() => onToggleCheck(index)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
