import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "react-bootstrap";
import { getBestSellingProducts } from "../api";

const Bestseller = ({ onOpenModal }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getBestSellingProducts();
      console.log(res.data.slice(0, 2));
      setProducts(res.data.slice(0, 2));
    } catch (err) {
      console.err("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="mt-4 lg:mt-6">
        <h2 className="text-center text-[12px] md:text-sm lg:text-2xl px-4 md:py-4 font-bold text-underline">
          Best Selling <span className="text-yellow-500">Products</span>
        </h2>
        <div className=" w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 grid grid-cols-1 md:grid-cols-2 ">
          {products.map((product) => (
            <div key={product.id} onClick={() => onOpenModal(product)} className="grid grid-cols-2 bg-gray-100 hover:shadow-lg md:rounded-5 lg:rounded-lg transition duration-300 mt-2 ">
              <div className="mt-2 p-2 flex flex-col justify-between">
                <p className="font-bold text-[9px] text-[7px] md:text-[15px] lg:text-2xl"> {product.name}</p>
                <p className="text-[6px] md:text-[7px] lg:text-[12px]">{product.description}</p>
                <div>
                  <p className="py-2 text-yellow-500 text-[9px] md:text-[10px] lg:text-xl font-bold">${product.price}</p>
                  <button onClick={() => onOpenModal(product)} className="text-[7px] md:text-sm lg:text-lg font-bold font-sans md:py-2 hover:text-color-red hover:underline transition duration-300">
                    -BUY NOW
                  </button>
                </div>
              </div>
              <div>
                <Image src={product.image} className="w-30 h-30 md:w-50 lg:w-full md:h-auto rounded-2 md:rounded-4 lg:rounded-xl object-cover " />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Bestseller;
