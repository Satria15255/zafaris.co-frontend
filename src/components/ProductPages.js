import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function ProductPages({ onAddToCart, onOpenModal }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Basketball", "Sneakers", "Running", "Casual"];

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  return (
    <div className="mt-12 p-8">
      <div className="border-b px-4 py-2 ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pt-2 transition font-bold px-2
        ${activeCategory === cat ? "text-yellow-500" : "hover:text-yellow-500"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 place-items-center mt-4 px-8  sm:grid-cols-4 gap-4">
        {filteredProducts.map((products) => (
          <ProductCard key={products.id} product={products} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
        ))}
      </div>
    </div>
  );
}

export default ProductPages;
