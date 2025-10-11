import React from "react";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-900 justify-center h-auto border-bottom">
      <div className="flex px-7 py-12  justify-between items-center">
        <div className="flex flex-col">
          <p className="text-white font-bold text-2xl ">
            ZAFARIS
            <span className="font-bold text-yellow-500">.CO</span>
          </p>
        </div>
        <div className="flex space-x-4">
          <p className="text-xs font-bold text-white text-2xl">Best Seller</p>
          <p className="text-xs font-bold text-white text-2xl">Latest Arrival</p>
          <p className="text-xs font-bold text-white text-2xl">On Promo</p>
          <p className="text-xs font-bold text-white text-2xl">Product</p>
          <p className="text-xs font-bold text-white text-2xl">Product Category</p>
        </div>
        <div className="flex sapce-x-2">
          <div className="text-xl text-white">
            <FaFacebookSquare />
          </div>
          <div className="text-xl text-white">
            <FaInstagramSquare />
          </div>
          <div className="text-xl text-white">
            <FaTwitterSquare />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-xs text-white pb-3">Copyright© 2025 Zafaris.Co All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
