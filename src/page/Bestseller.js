import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "react-bootstrap";
import { getBestSellingProducts } from "../api";

const Bestseller = ({ onOpenModal }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getBestSellingProducts();

      if(Array.isArray(res.data)) {
        setProducts(res.data)
      }else{
        console.warn("Unexpected data format",res.data)
        setProducts([])
      }

      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.err("Failed to fetch products:", err);
      setProducts([])
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="p-2 md:px-6 py-3 mt-2 md:py-5">
        <h2 className="text-center text-[9px] md:text-2xl px-4 md:py-4 font-bold text-underline">
          Best Selling <span className="text-yellow-500">Products</span>
        </h2>
        <div className=" w-full gap-3 md:gap-4 md:px-8 flex justify-around">
          {Array.isArray(products) &&
            products.map((product) => (
              <div key={product.id} onClick={() => onOpenModal(product)} className="flex md:w-2/5 md:gap-4 hover:shadow-lg md:rounded-5 transition duration-300 flex-col py-4 ">
                <Image src={product.image} className="w-30 h-30 md:w-full md:h-auto rounded-2 md:rounded-4 object-cover " />
                <div className="mt-2">
                  <p className="font-bold text-[7px] md:text-sm"> {product.name}</p>
                  <p className="py-2 text-yellow-500 text-[6px] font-bold">${product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Bestseller;
