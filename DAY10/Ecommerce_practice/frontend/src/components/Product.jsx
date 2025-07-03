import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const fetchProduct = async () => {
    let response = await axios(`https://fakestoreapi.com/products/${id}`);
    setProduct(response.data);
    console.log(product);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <li key={product.id} className="shadow-lg w-40 m-4 rounded-2xl">
        <img src={product.image} alt={product.title} className="h-50" />
        <h1>{product.title}</h1>
        <p>{product.price}</p>
      </li>
    </div>
  );
}
