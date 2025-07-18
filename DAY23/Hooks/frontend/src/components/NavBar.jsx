import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./ContextProvider";
export default function NavBar() {
    const { count } = useContext(UserContext);
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
        <h1>COunt{count}</h1>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/sidebar" style={{ color: "white", textDecoration: "none" }}>Sidebar</Link>
      <Link to="/counter" style={{ color: "white", textDecoration: "none" }}>Counter</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
    </nav>
  );
}
