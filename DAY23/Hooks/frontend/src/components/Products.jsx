import React from "react";
import useProducts from "./useProducts";

export default function Products() {
  const { products, loading, error, refresh } = useProducts();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>🛒 FakeStore Products</h1>
      <button onClick={refresh}>🔄 Refresh</button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
