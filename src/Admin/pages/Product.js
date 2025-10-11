import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductTable from "../components/ProductTable";
import ProductUploadForm from "../components/ProductUploadForm";
import ProductEditForm from "../components/ProductEditForm";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    await axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Product deleted!");
    fetchProducts();
  };

  const handleUploadSuccess = () => {
    setIsUploadOpen(false);
    fetchProducts();
  };

  const handleEditSucces = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Product Management</h1>

        <button onClick={() => setIsUploadOpen(true)} className=" border border-black hover:bg-gray-900 transition duration-100 hover:text-white py-2 px-3 rounded-lg font-semibold flex justify-center">
          Add Product
        </button>
      </div>

      <div>
        <ProductTable products={products} onEdit={(product) => setEditingProduct(product)} onDelete={handleDelete} />
      </div>

      {isUploadOpen && <ProductUploadForm onClose={() => setIsUploadOpen(false)} onSucces={handleUploadSuccess} />}

      {editingProduct && <ProductEditForm product={editingProduct} onClose={() => setEditingProduct(null)} onSucces={handleEditSucces} />}
    </div>
  );
};

export default Product;
