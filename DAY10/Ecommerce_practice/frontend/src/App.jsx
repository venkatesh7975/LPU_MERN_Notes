import React from "react";
import ProductList from "./components/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Product from "./components/Product";
import ProtectedRoute from "./components/ProtectedRoute";
import Fetch from "./components/Fetch";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/fetch" element={<Fetch />} />
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
