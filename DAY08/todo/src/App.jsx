import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import ProtectedRoute from "./components/ProtectedRoute"; // import it
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="p-5 text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
