import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "react-bootstrap"; // Import Nav from react-bootstrap
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Category({ onOpenModal }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Basketball");
  const categories = ["Basketball", "Sneakers", "Running", "Casual"];

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

  const filteredProducts = products.filter((products) => products.category === activeCategory).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
      whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
      transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
      viewport={{ once: true }}
    >
      <div>
        <div className="p-8">
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
          <div className="grid px-4 py-2 grid-cols-1 h-45 px-8 sm:grid-cols-4 gap-3 place-items-center">
            {filteredProducts.map((product) => (
              <ProductCard product={product} onOpenModal={onOpenModal} />
            ))}
          </div>
          <div>
            <Nav.Link as={NavLink} to="/zafaris.co/products" className="flex py-4 justify-center mb-4 hover:underline hover:text-gray-900 text-gray-500 font-semibold text-lg">
              View More Products
            </Nav.Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default Category;
