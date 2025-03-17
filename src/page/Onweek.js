import React from "react";
import { motion } from "framer-motion";
import { Container, Image } from "react-bootstrap";
import img1 from "../assets/product/product/id 6.png";

const Onweek = () => {
  return (
    <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="py-5">
        <div className="border-bottom">
          <h2 className="text-left text-3xl px-4 py-4 font-bold text-underline">Trend Of the Week</h2>
        </div>
        <div>
          <Container className="flex-row lg:flex px-0 pt-4 ">
            <Image src={img1} className="flex-col-8 w-full lg:w-2/5 h-auto max-w-[100%] aspect-[1/1] object-cover rounded-md px-1" />

            <div className="px-4 flex-col-4">
              <p>Sneakers</p>
              <h2 className="font-bold text-3xl py-3"> Nike Air Barrage</h2>
              <p>$160.00</p>
              <p></p>
              <p className="py-2 text-xl text-color-gray">
                The Nike Air Barrage is a bold, retro-style sneaker featuring a durable leather and mesh upper, full-length Air cushioning for comfort, and a distinctive chunky outsole with aggressive traction. Its iconic 'AIR' branding and
                secure fit make it perfect for both sports and streetwear.
              </p>
              <button className="font-bold font-sans py-2 hover:text-color-red hover:underline transition duration-300">SHOOP NOW</button>
            </div>
          </Container>
        </div>
      </div>
    </motion.div>
  );
};

export default Onweek;
