import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getLatestProducts, addToCart } from "../api";
import { toast } from "react-toastify";

function ProductList({ onOpenModal }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getLatestProducts();
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.err("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartItems = async (productId) => {
    try {
      const res = await addToCart(productId, 1);
      toast.success("Product added to cart");
      console.log("Product add to cart", res.data);
    } catch (err) {
      toast.error("Failed to add product to cart");
      console.log("Failed add product", err);
    }
  };

  return (
    <div className="grid py-2 h-45 grid-cols-2 md:grid-cols-4 gap-3 place-items-center">
      {products.map((products) => (
        <ProductCard key={products.id} product={products} addToCart={() => addToCartItems(products._id)} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}

export default ProductList;
