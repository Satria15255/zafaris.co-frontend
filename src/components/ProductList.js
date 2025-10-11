import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function ProductList({ onOpenModal }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/latest");
      setProducts(res.data);
    } catch (err) {
      console.err("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product add to cart", res.data);
    } catch (err) {
      console.log("Failed add product", err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 h-45 mt-12 px-8 sm:grid-cols-4 gap-3 place-items-center">
        {products.map((products) => (
          <ProductCard key={products.id} product={products} addToCart={() => addToCart(products._id)} onOpenModal={onOpenModal} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
