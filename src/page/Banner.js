import React from "react";
import Slide2 from "../assets/elemen/img/banner1.2.png";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Banner() {
  return (
    <div className="flex justify-center items-center md:mt-2 lg:h-[95vh] ">
      <div className="flex w-full justify-center items-center p-1 md:p-4 lg:p-2 mt-10 md:mt-12">
        <div className=" flex w-full h-[80vh] md:h-[65vh] lg:h-[85vh] z-0 rounded-3xl md:rounded-5 lg:rounded-3xl bg-center bg-cover" style={{ backgroundImage: `url(${Slide2})` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center w-100 h-full rounded-3xl ">
            <div className="p-3 flex flex-col gap-1 lg:space-y-5">
              <h2 className="text-left text-4xl md:text-4xl lg:text-6xl drop-shadow-2xl font-bold flex flex-col">
                Walk in Comfort <span>Step in Style.</span>
              </h2>
              <p className="text-left text-xs md:text-xs lg:text-sm max-w-sm text-gray-500 drop-shadow-2xl md:mt-2 ">
                Zafaris.co is where style meets comfort in every step. We offer a curated selection of high-quality shoes with modern designs that reflect your unique character.
              </p>
              <div className="flex gap-2 py-2 md:mt-2 w-100 w-10 md:w-50">
                <Nav.Link
                  as={NavLink}
                  to="/products"
                  className="flex items-center justify-center text-sm md:text-sm lg:text-lg w-1/2 md:w-2/5 py-1 md:py-6 md:h-[8vh] lg:h-[8vh] border border-black rounded-full  hover:bg-black hover:text-white text-center font-semibold text-gray-900 transition duration-100"
                >
                  DISCOVER ⇾
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
