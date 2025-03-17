import React from "react";
import { Col, Row } from "react-bootstrap";

function ProductModal({ product, onClose, onAddToCart }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full h-full md:w-4/5 md:h-auto flex-row md:flex-col overflow-y-auto">
        <Row>
          <div className="flex flex-row md:hidden justify-between">
            <h2 className="lg:text-3xl md:text-lg pb-4 lg:pb-4 font-bold w-full border-bottom ">{product.text}</h2>
            <button onClick={onClose} className="text-gray-500 -mt-6 text-lg hover:text-gray-700 top-0">
              ×
            </button>
          </div>
          <Col md={5} className="flex  items-center md:items-start">
            <img src={product.image} alt={product.name} className=" md:w-full h-auto object-cover flex justify-center rounded-md mt-2" />
          </Col>
          <Col md={7} className="flex justify-arround flex-col">
            <div className="flex flex-row justify-between hidden md:flex">
              <h2 className="lg:text-3xl md:text-lg pb-3 lg:pb-4 font-bold w-full border-bottom ">{product.text}</h2>
              <button onClick={onClose} className="text-gray-500 -mt-6 text-lg hover:text-gray-700 top-0">
                ×
              </button>
            </div>
            <div className="mt-4">
              <span className="lg:text-2xl md:text-sm pb-1 lg:py-4 font-semibold">${product.price.toFixed(2)}</span>
            </div>
            <p className="py-3 text-sm lg:text-lg border-bottom w-full ">{product.description}</p>
            <div className="mt-auto flex flex-col justify-arround hidden xl:flex items-end ">
              <button onClick={() => onAddToCart(product)} className="mt-3 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">
                Add to Cart
              </button>
              <button className="mt-2 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">Chekout</button>
            </div>
          </Col>
          <div className="mt-auto flex flex-col justify-arround xl:hidden items-end ">
            <button onClick={() => onAddToCart(product)} className="mt-3 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">
              Add to Cart
            </button>
            <button className="mt-2 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">Chekout</button>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default ProductModal;
