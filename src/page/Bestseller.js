import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "react-bootstrap";
import axios from "axios";

const Bestseller = ({ onOpenModal }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/best-seller");
      setProducts(res.data);
    } catch (err) {
      console.err("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="px-6 py-5">
        <h2 className="text-center text-2xl px-4 py-4 font-bold text-underline">
          Best Selling <span className="text-yellow-500">Products</span>
        </h2>
        <div className=" w-full gap-4 px-8  flex justify-center">
          {products.map((product) => (
            <div key={product.id} onClick={() => onOpenModal(product)} className="flex w-2/5 gap-4 hover:shadow-lg rounded-5 transition duration-300 flex-col py-4 ">
              <Image src={product.image} className="w-full h-auto rounded-4 object-cover " />
              <div className="px-4 ">
                <p className="font-bold text-sm"> {product.name}</p>
                <p className="py-2 text-yellow-500 font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Bestseller;
