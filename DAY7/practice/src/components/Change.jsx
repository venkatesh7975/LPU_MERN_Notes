import { useState } from "react";
export default function Change() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  function onInputChange(event) {
    setName(event.target.value);
  }

  function onSubmit() {
    setNames([...names, name]);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={onInputChange}
      />
      <button onClick={onSubmit}>Submit</button>

      {
        names.map((name, index) =>
          <div key={index}>
            <h1>{name}</h1>
          </div>
        )
      }
    </div>
  );
}
