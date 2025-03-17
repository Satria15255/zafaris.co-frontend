import React from "react";
import ProductCard from "./ProductCard";
import products from "../data/product";

function ProductList({ onAddToCart, onOpenModal }) {
  return (
    <div className="grid grid-cols-1 h-75 sm:grid-cols-4 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}

export default ProductList;
