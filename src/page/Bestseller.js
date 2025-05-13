import React from "react";
import { motion } from "framer-motion";
import { Container, Image } from "react-bootstrap";
import products from "../data/product";

const Bestseller = ({ onOpenModal }) => {
  const bestSeller = products.filter((product) => product.id === 2 || product.id === 7 || product.id === 12);
  return (
    <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="px-4 py-5">
        <div>
          <div className="border-bottom">
            <h2 className="text-left text-3xl px-4 py-4 font-bold text-underline">Best Seller</h2>
          </div>
          <div className="border-bottom">
            {bestSeller.map((product) => (
              <Container key={product.id} className="flex px-0 py-4 items-center">
                <div className="flex">
                  <Image src={product.image} className="w-1/5 h-auto object-cover " />
                  <div className="px-4 ">
                    <p onClick={() => onOpenModal(product)} className="font-bold text-sm">
                      {" "}
                      {product.name}
                    </p>
                    <p className="py-2">${product.price}</p>
                  </div>
                </div>
              </Container>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bestseller;
