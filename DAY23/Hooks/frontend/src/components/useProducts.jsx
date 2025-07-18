import { useState, useEffect } from "react";
import axios from "axios";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  ;
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refresh: fetchProducts };
}
