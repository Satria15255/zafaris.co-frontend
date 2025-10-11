import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = ({ onAddToCart, onOpenModal }) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, [categoryName]);

  console.log(products);

  const filteredProducts = products.filter((p) => typeof p.category === "string" && typeof categoryName === "string" && p.category.toLowerCase() === categoryName.toLowerCase());

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Kategori: {categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product._id || product.id} product={product} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />)
        ) : (
          <p className="text-gray-500">Tidak ada produk untuk kategori ini.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
