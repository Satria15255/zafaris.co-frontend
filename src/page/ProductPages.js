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
    <div className="mt-12 p-2">
      <div style={{ backgroundImage: `url(${bgProductPages})` }} className="z-0 flex flex-col justify-between items-center h-[60vh] bg-center bg-cover rounded-3xl mb-4">
        <div className="bg-transparant font-light ml-5">.</div>
        <p className="text-8xl font-bold text-white">Product</p>
        <div className="w-[180vh] rounded-t-2xl bg-white flex justify-between items-center h-[9vh] px-3">
          <p className="font-bold text-lg">Give All You Want</p>
          <p>Search Bar</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-[180vh] px-2">
          <div className="flex flex-col w-1/5">
            <p className="text-xl font-bold">Category</p>
            <div className="py-2 flex flex-col pl-4 text-left space-y-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pt-2 transition text-[9px] md:text-lg text-left font-bold px-2
        ${activeCategory === cat ? "text-yellow-500" : "hover:text-yellow-500"}`}
                >
                  - {cat}
                </button>
              ))}
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
