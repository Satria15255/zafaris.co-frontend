import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Image } from "react-bootstrap";
import axios from "axios";

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
      const res = await axios.get("http://localhost:5000/api/products");
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
      <div className=" bg-gray-900  flex justify-center w-full">
        {randomProduct.map((product) => (
          <div key={product.id}>
            <Container className="flex justify-center lg:flex px-0 py-2">
              <div className="flex flex-col justify-center text-right">
                <p className="text-6xl text-white font-bold">ON</p>
                <p className="text-6xl font-bold text-yellow-500">SALE!!</p>
              </div>
              <Image src={product.image} onClick={() => onOpenModal(product)} className="flex-col-8 w-1/5 md:w-full lg:w-1/5 h-auto max-w-[100%] aspect-[1/1] object-cover rounded-4 px-1" />
              <div className="px-4 flex flex-col justify-center">
                <h2 onClick={() => onOpenModal(product)} className="font-bold text-white text-2xl lg:text-2xl py-3">
                  {" "}
                  {product.name}
                </h2>
                <p className="font-bold text-yellow-500">${product.price}</p>
                <p className="py-2 text-xs text-white ">{product.description}</p>
                <div>
                  <button onClick={() => onOpenModal(product)} className=" font-bold font-sans py-2 text-white hover:text-color-red hover:underline transition duration-300">
                    SHOOP NOW
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
