import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Image } from "react-bootstrap";
import { getAllProducts } from "../api";

function seededRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleWithSeed(array, seed) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 1; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Onweek({ onOpenModal }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.err("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const today = new Date();
  const seed = parseInt(today.toISOString().slice(0, 10).replace(/-/g, ""));

  const randomProduct = shuffleWithSeed(products, seed).slice(0, 1);

  return (
    <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className=" bg-gray-900 mt-6 flex justify-around w-full">
        {randomProduct.map((product) => (
          <div key={product.id}>
            <Container className="flex items-center px-0 py-2">
              <div className="flex flex-col justify-center text-right pl-2">
                <p className="text-[9px] md:text-xl lg:text-6xl text-white font-bold">ON</p>
                <p className="text-[9px] md:text-xl lg:text-6xl font-bold text-yellow-500">SALE!!</p>
              </div>
              <div className="md:w-40 md:h-40 lg:w-1/4 lg:h-auto flex justify-center items-center">
                <Image src={product.image} onClick={() => onOpenModal(product)} className="w-full h-auto  rounded-4 px-1" />
              </div>
              <div className="px-2 lg:px-4 flex flex-col justify-center">
                <h2 onClick={() => onOpenModal(product)} className="font-bold text-white text-[9px] md:text-xl lg:text-2xl md:py-3">
                  {" "}
                  {product.name}
                </h2>
                <p className="font-bold text-[7px] md:text-[12px] lg:text-lg text-yellow-500">${product.price}</p>
                <p className="mt-1 md:py-2 text-[5px] md:text-[7px] lg:text-xs text-white max-w-lg ">{product.description}</p>
                <div>
                  <button onClick={() => onOpenModal(product)} className="text-[7px] md:text-sm lg:text-lg font-bold font-sans md:py-2 text-white hover:text-color-red hover:underline transition duration-300">
                    BUY NOW
                  </button>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Onweek;
