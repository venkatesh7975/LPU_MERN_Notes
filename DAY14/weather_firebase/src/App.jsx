import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Weather from "./components/Weather";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="*" element={<h2>not found</h2>}/>
      </Routes>
    </Router>
  );
}

export default App;
