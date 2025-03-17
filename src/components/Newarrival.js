import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import img1 from "../assets/product/img/arrv1.jpg";
import img2 from "../assets/product/img/arrv2.jpg";

const Newarrival = () => {
  return (
    <div>
      <div className="flex justify-content-center gap-2 py-5">
        <Container className="flex bg-body-tertiary px-0 ">
          <div className="flex col-6">
            <div className="py-5 px-3">
              <h2 className="font-bold text-3xl"> Minimal Armchairs</h2>
              <p className="py-2 text-xl">Get a comfy seat all to yourself</p>
              <button className="font-bold font-sans py-2 hover:text-color-red hover:underline transition duration-300">SHOOP NOW</button>
            </div>
          </div>
          <Image src={img1} className="w-50 h-auto object-cover" />
        </Container>
        <div className="flex col-6">
          <Container className="flex bg-body-tertiary px-0 ">
            <div className="flex col-6">
              <div className="py-5 px-3">
                <h2 className="font-bold text-3xl"> Minimal Armchairs</h2>
                <p className="py-2 text-xl">Get a comfy seat all to yourself</p>
                <button className="font-bold font-sans py-2 hover:text-color-red hover:underline transition duration-300">SHOOP NOW</button>
              </div>
            </div>
            <Image src={img2} className="w-50 h-auto object-cover" />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Newarrival;
