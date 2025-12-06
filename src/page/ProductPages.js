import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api";
import bgProductPages from "../assets/elemen/img/hero3.png";

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
    <div className="mt-12 p-1 md:p-2">
      <div style={{ backgroundImage: `url(${bgProductPages})` }} className="z-0 flex flex-col justify-between items-center h-[30vh] md:h-[60vh] bg-center bg-cover rounded-lg md:rounded-3xl mb-2 md:mb-4">
        <div className="bg-transparant font-light ml-5">.</div>
        <p className="text-2xl md:text-8xl font-bold text-white">Product</p>
        <div className="w-4/5 md:w-[180vh] rounded-t-2xl bg-white flex justify-between items-center h-[6vh] md:h-[9vh] px-3">
          <p className="font-bold text-xs md:text-lg">Give All You Want</p>
          <p className="font-bold text-xs md:text-lg">Search Bar</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="md:flex flex-col w-[100vh] md:w-[180vh] px-2">
          <div className="flex justify-between md:flex-col md:w-1/5">
            <div className="flex items-center">
              <p className="text-sm md:text-xl font-bold">Category</p>
            </div>
            <div>
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="py-2 flex md:flex-col pl-4 text-left space-y-6">
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`md:pt-2 transition text-[9px] md:text-lg text-left font-bold px-2
        ${activeCategory === cat ? "text-yellow-500" : "hover:text-yellow-500"}`}
                  >
                    - {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 place-items-center md:grid-cols-3 gap-3">
            {filteredProducts.map((products) => (
              <ProductCard key={products.id} product={products} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPages;
