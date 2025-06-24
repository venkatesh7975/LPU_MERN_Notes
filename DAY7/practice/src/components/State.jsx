import { useState } from "react";
import "./Style.css";

export default function State() {
  const [count, setCount] = useState(0);
  let nameClass = "black";
  if (count > 0) {
    nameClass = "green";
  } else if (count < 0) {
    nameClass = "red";
  } else {
    nameClass = "black";
  }

  function onIncrease() {
    setCount(count + 1);
    console.log(count);
  }

  function onDecrease() {
    setCount(count - 1);
  }

  function onReset() {
    setCount(0);
  }

  return (
    <div className="container">
      <h1>
        COunt <span className={nameClass}>{count}</span>
      </h1>
      <button onClick={onIncrease}>Increase</button>
      <button onClick={onDecrease}>Decrease</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
