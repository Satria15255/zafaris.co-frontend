import React from "react";
import Slide2 from "../assets/elemen/img/hero3.png";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Banner() {
  return (
    <div className="flex justify-center items-center md:mt-2 lg:h-[95vh] ">
      <div className="flex justify-center items-center p-1 md:p-4 lg:p-2 mt-10 md:mt-12">
        <div className=" flex  h-[40vh] md:h-[65vh] lg:h-[85vh] z-0 rounded-3xl md:rounded-5 lg:rounded-3xl bg-center bg-cover" style={{ backgroundImage: `url(${Slide2})` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center w-100 h-full rounded-3xl bg-black/30 ">
            <div className="p-3 flex flex-col gap-1 lg:space-y-7">
              <h2 className="!text-center md:!text-left text-[19px] md:text-4xl lg:text-7xl drop-shadow-2xl text-white font-bold">Walk in Comfort Step in Style.</h2>
              <p className="!text-center md:!text-left text-[7px] md:text-xs lg:text-lg text-white drop-shadow-2xl md:mt-2 lg:mt-2">
                Zafaris.co is where style meets comfort in every step. We offer a curated selection of high-quality shoes with modern designs that reflect your unique character. From casual looks to streetwear, every pair is crafted to
                support your active and confident lifestyle.
              </p>
              <div className="flex flex-col items-center md:flex-row gap-2 py-2 md:mt-2 lg:mt-4 w-100 w-10 md:w-50">
                <Nav.Link
                  as={NavLink}
                  to="/products"
                  className="flex items-center justify-center text-[7px] md:text-sm lg:text-lg w-2/5 md:w-1/2 py-1 md:py-6 md:h-[8vh] lg:h-[10vh] border border-black hover:border-yellow-500 rounded-full  hover:bg-yellow-500 text-center bg-gray-900 text-white transition duration-100"
                >
                  Discover
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
