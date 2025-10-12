import React from "react";
import Slide2 from "../assets/elemen/img/hero3.png";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Banner() {
  return (
    <div className="flex justify-center h-[95vh] p-8 mt-6 ">
      <div className=" flex justify-center items-center w-full h-auto z-0 rounded-5 bg-center bg-cover" style={{ backgroundImage: `url(${Slide2})` }}>
        <div className="grid grid-cols-2 place-items-center justify-center w-full h-full rounded-5 bg-black/20 ">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl drop-shadow-2xl text-white font-bold">
              Walk in Comfort
              <br />
              Step in Style.
            </h2>
            <p className="text-xs md:text-xl text-white drop-shadow-2xl mt-2">Find the best shoes for every step you take!</p>
            <div className="flex flex-col md:flex-row gap-2 py-2 mt-2 w-full md:w-50">
              <Nav.Link as={NavLink} to="/zafaris.co/products" className="border border-black hover:border-yellow-500 w-2/4 md:w-1/2 py-3 md:py-4 hover:bg-yellow-500 text-center bg-gray-900 text-white transition duration-100">
                Discover
              </Nav.Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
