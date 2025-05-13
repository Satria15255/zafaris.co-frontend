import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  // Fungsi Checkout product
  const handleChekoutNow = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    } else {
      onClose();
    }

    const productWithSize = {
      ...product,
      size: selectedSize,
      quantity: 1,
    };

    navigate("/zafaris.co/chekout", { state: { chekoutItems: [productWithSize] } });
  };

  // const closed = () => {
  //   if (selectedSize) {
  //     onClose();
  //   }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full h-full md:w-4/5 md:h-auto flex-row md:flex-col overflow-y-auto">
        <Row>
          <div className="flex flex-row md:hidden justify-between">
            <h2 className="lg:text-3xl md:text-lg pb-4 lg:pb-4 font-bold w-full border-bottom ">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 -mt-6 text-lg hover:text-gray-700 top-0">
              ×
            </button>
          </div>
          <Col md={5} className="flex  items-center md:items-start">
            <img src={product.image} alt={product.name} className=" md:w-full h-auto object-cover flex justify-center rounded-md mt-2" />
          </Col>
          <Col md={7} className="flex justify-arround flex-col">
            <div className="flex flex-row justify-between hidden md:flex">
              <h2 className="lg:text-3xl md:text-lg pb-3 lg:pb-4 font-bold w-full border-bottom ">{product.name}</h2>
              <button onClick={onClose} className="text-gray-500 -mt-6 text-lg hover:text-gray-700 top-0">
                ×
              </button>
            </div>
            <div className="mt-4">
              <span className="lg:text-2xl md:text-sm pb-1 lg:py-4 font-semibold">${product.price.toFixed(2)}</span>
            </div>
            <p className="py-3 text-sm lg:text-lg border-bottom w-full ">{product.description}</p>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border px-2 py-1 rounded" required>
              <option value="">Pilih Ukuran</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
            </select>
            <div className="mt-auto flex flex-col justify-arround hidden xl:flex items-end ">
              <button onClick={() => onAddToCart(product, selectedSize)} className="mt-3 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleChekoutNow();
                  // closed();
                }}
                className="mt-2 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition"
              >
                Chekout
              </button>
            </div>
          </Col>
          <div className="mt-auto flex flex-col justify-arround xl:hidden items-end ">
            <button onClick={() => onAddToCart(product, selectedSize)} className="mt-3 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">
              Add to Cart
            </button>
            <button
              onClick={() => {
                handleChekoutNow();
              }}
              className="mt-2 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition"
            >
              Chekout
            </button>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default ProductModal;
