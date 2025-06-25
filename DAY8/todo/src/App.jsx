import Signin from "./components/Signin";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";

export default function App() {
  return (
    <div className=" bg-danger p-5 text-center ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<Todo/>}   />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
