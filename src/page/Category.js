import React from "react";
import { motion } from "framer-motion";

function Category() {
  const categories = [
    { title: "BASKETBALL", products: 8, image: require("../assets/product/img/basketball.png") },
    { title: "SNEAKERS", products: 10, image: require("../assets/product/img/sneakers.png") },
    { title: "RUNNING", products: 9, image: require("../assets/product/img/running.png") },
    { title: "CASUAL", products: 9, image: require("../assets/product/img/cat1.png") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
      whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
      transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
      viewport={{ once: true }}
    >
      <div>
        <div className="grid grid-cols-7 justify-content-center pb-5">
          <p className="grid justify-content-center text-5xl font-bold col-start-4 py-3 border-bottom"> Category </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {categories.map((category, index) => (
            <div key={index} className="relative h-80 flex items-center justify-center bg-cover bg-center shadow-md" style={{ backgroundImage: `url(${category.image})` }}>
              {/* Kotak untuk teks */}
              <div className="absolute bg-white w-64 lg:w-64 text-center px-6 py-4  hover:scale-105 transition-transform duration-300 shadow-md">
                <h2 className="text-lg flex justify-center font-semibold text-gray-800">{category.title}</h2>
                <p className="text-sm text-gray-600">{category.products} products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
export default Category;
