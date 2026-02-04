import React from "react";
import Image1 from "../assets/elemen/img/hero1.jpg";
import Image2 from "../assets/elemen/img/hero 2.jpg";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { MdArrowRightAlt } from "react-icons/md";
import "swiper/css";
import "swiper/css/effect-fade";

function Banner() {
  return (
    <div className="relative w-full justify-center items-center">
      <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 4000 }} loop className="h-screen z-0  ">
        <SwiperSlide>
          <img src={Image1} alt="image1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image2} alt="image2" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      <div className="absolute flex justify-center inset-0 z-100 p-4 lg:pl-7 flex flex-col gap-1 lg:space-y-5">
        <h2 className="text-left text-4xl md:text-4xl lg:text-7xl text-white drop-shadow-2xl font-bold flex flex-col">
          Walk in Comfort <span>Step in Style.</span>
        </h2>
        <p className="text-left text-xs md:text-xs lg:text-sm text-white max-w-xs md:max-w-sm text-gray-500 drop-shadow-2xl md:mt-2 ">
          Zafaris.co is where style meets comfort in every step. We offer a curated selection of high-quality shoes with modern designs that reflect your unique character.
        </p>
        <div className="flex gap-2 py-2 md:mt-2 w-100 w-10 md:w-50">
          <Nav.Link
            as={NavLink}
            to="/products"
            className="flex items-center justify-center text-white text-sm md:text-sm lg:text-lg w-1/2 md:w-2/5 lg:w-1/5 py-1 md:py-6 md:h-[8vh] lg:h-[8vh] border rounded-full  hover:bg-black hover:text-white text-center font-semibold text-gray-900 transition duration-100"
          >
            DISCOVER{" "}
            <span>
              <MdArrowRightAlt size={30} />
            </span>
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
