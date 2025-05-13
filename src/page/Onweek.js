import React from "react";
import { motion } from "framer-motion";
import { Container, Image } from "react-bootstrap";
import products from "../data/product";

function Onweek({ onOpenModal }) {
  const trenProduct = products.filter((product) => product.id === 1);
  return (
    <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="py-5">
        <div className="border-bottom">
          <h2 className="text-left text-3xl px-4 py-4 font-bold text-underline">Trend Of the Week</h2>
        </div>
        {trenProduct.map((product) => (
          <div key={product.id}>
            <Container className="flex-row lg:flex px-0 pt-4 ">
              <Image src={product.image} className="flex-col-8 w-full lg:w-2/5 h-auto max-w-[100%] aspect-[1/1] object-cover rounded-md px-1" />
              <div className="px-4 flex-col-4">
                <p>{product.category}</p>
                <h2 className="font-bold text-3xl py-3"> {product.name}</h2>
                <p>${product.price}</p>
                <p></p>
                <p className="py-2 text-xl text-color-gray">{product.description}</p>
                <button onClick={() => onOpenModal(product)} className="font-bold font-sans py-2 hover:text-color-red hover:underline transition duration-300">
                  SHOOP NOW
                </button>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Onweek;
