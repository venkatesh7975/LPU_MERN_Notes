import React from "react";
import Home from "./components/Home";
import { UserContext } from "./components/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Counter from "./components/Counter";
import Products from "./components/Products";

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <UserContext.Provider value={{ count,setCount}}>
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Home 🏠</h1>} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}
