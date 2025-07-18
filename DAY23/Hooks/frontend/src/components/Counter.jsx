import { useContext } from "react";
import { UserContext } from "./ContextProvider";

export default function Counter() {
  const { count, setCount } = useContext(UserContext);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
