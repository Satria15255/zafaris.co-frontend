import React from "react";
import { motion } from "framer-motion";
import { Container, Image } from "react-bootstrap";
import img1 from "../assets/product/product/id 5.png";
import img2 from "../assets/product/product/id 7.png";
import img3 from "../assets/product/product/id 8.png";

const Bestseller = () => {
  return (
    <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.0 }} viewport={{ once: true }}>
      <div className="px-4 py-5">
        <div>
          <div className="border-bottom">
            <h2 className="text-left text-3xl px-4 py-4 font-bold text-underline">Best Seller</h2>
          </div>
          <div className="border-bottom">
            <Container className="flex px-0 py-4 items-center">
              <div className="flex">
                <Image src={img1} className="w-1/5 h-auto object-cover " />
                <div className="px-4 ">
                  <p className="font-bold text-sm"> Nike Air Monacrh IV</p>
                  <p className="py-2">$75.00</p>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div>
          <div className="border-bottom">
            <Container className="flex px-0 py-4 items-center ">
              <div className="flex">
                <Image src={img2} className="w-1/5 h-auto object-cover " />
                <div className="px-4 ">
                  <h2 className="font-bold text-sm"> Nike Air Jordan IV</h2>
                  <p className="py-2">$225.00</p>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div>
          <div className="border-bottom ">
            <Container className="flex px-0 py-4 items-center ">
              <div className="flex ">
                <Image src={img3} className="w-1/5 h-auto object-cover" />
                <div className="px-4 ">
                  <h2 className="font-bold text-sm"> Nike Air Flight 89</h2>
                  <p className="py-2">$140.00</p>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bestseller;
