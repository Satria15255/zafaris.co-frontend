import React from "react";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-900 justify-center h-auto ">
      <div className="flex px-2 md:px-7 py-6 md:py-12  justify-between items-center">
        <div className="flex flex-col">
          <p className="text-white font-bold text-[9px] md:text-lg lg:text-2xl ">
            ZAFARIS
            <span className="font-bold text-yellow-500">.CO</span>
          </p>
        </div>
        <div className="flex space-x-1 md:space-x-4">
          <p className="font-bold text-white text-[5px] md:text-md lg:text-lg">Best Seller</p>
          <p className="font-bold text-white text-[5px] md:text-md lg:text-lg">Latest Arrival</p>
          <p className="font-bold text-white text-[5px] md:text-md lg:text-lg">On Promo</p>
          <p className="font-bold text-white text-[5px] md:text-md lg:text-lg">Product</p>
          <p className="font-bold text-white text-[5px] md:text-md lg:text-lg">Product Category</p>
        </div>
        <div className="flex space-x-2">
          <div className="text-[6px] md:text-xl text-white">
            <FaFacebookSquare />
          </div>
          <div className="text-[6px] md:text-xl text-white">
            <FaInstagramSquare />
          </div>
          <div className="text-[6px] md:text-xl text-white">
            <FaTwitterSquare />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[4px] md:text-[8px] lg:text-xs text-white md:pb-3">Copyright© 2025 Zafaris.Co All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
