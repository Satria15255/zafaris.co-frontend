import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api";

function ProductPages({ onAddToCart, onOpenModal }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Basketball", "Sneakers", "Running", "Casual"];

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
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
    <div className="mt-12 p-2">
      <div className="border-b py-2 ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pt-2 transition text-[9px] font-bold px-2
        ${activeCategory === cat ? "text-yellow-500" : "hover:text-yellow-500"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 place-items-center mt-4 md:grid-cols-4 gap-3">
        {filteredProducts.map((products) => (
          <ProductCard key={products.id} product={products} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
        ))}
      </div>
    </div>
  );
}

export default ProductPages;
