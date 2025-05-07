import React from "react";
import ProductCard from "./ProductCard";
import products from "../data/product";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

function ProductList({ onAddToCart, onOpenModal }) {
  const filteredProducts = products.filter((product) => product.id % 4 === 0);

  return (
    <div>
      <div className="grid grid-cols-1 h-45 py-12 mt-4 mb-6 sm:grid-cols-4 gap-3 place-items-center">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
        ))}
      </div>
      <div>
        <Nav.Link as={NavLink} to="/zafaris.co/products" className="flex justify-center mb-4 hover:underline hover:text-gray-900 text-gray-500 font-semibold text-lg">
          View More Products
        </Nav.Link>
      </div>
    </div>
  );
}

export default ProductList;
