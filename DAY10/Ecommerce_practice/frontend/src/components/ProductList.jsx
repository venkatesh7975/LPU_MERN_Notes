import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  async function getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
    setFilterProducts(data);
  }

  //useEffect
  //useEffect(cb,dependency)
  useEffect(function () {
    getProducts();
    console.log(products);
  }, [products]);

  function onInputChange(e) {
    setInput(e.target.value);
    const filteringproducts = products.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilterProducts(filteringproducts);
  }

  return (
    <div>
      <input
        className="border-amber-200 border-2 bg-blue-200"
        placeholder="search products"
        onChange={onInputChange}
      />
      <select>
        <option>Select </option>
        <option>High to low</option>
        <option> low to high</option>
      </select>

      <ul className="flex flex-wrap ">
        {filterProducts.map((product) => (
          <Link to={`${product.id}`} key={product.id}>
            <li className="shadow-lg  rounded-2xl w-72 p-5 h-84 m-auto">
              <img src={product.image} alt={product.title} className="h-50" />
              <h1 className="text-green-500">{product.title}</h1>
              <p>{product.price}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
