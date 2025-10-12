import React, { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import MainLayout from "./Layouts/MainLayout";
import AdminLayout from "./Layouts/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import AdminLoginPage from "./page/AdminLoginPage";
import Transaction from "./Admin/pages/Transaction";
import AdminUserList from "./Admin/pages/AdminUserList";
import Login from "./page/Login";
import Register from "./page/Register";
import Sidebar from "./components/Sidebar";
import OrderPages from "./page/OrderPages";
import AdminDashboard from "./Admin/pages/Dashboard";
import Product from "./Admin/pages/Product";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/Cart";
import ProductModal from "./components/ProductModal";
import Banner from "./components/Banner";
import Onweek from "./page/Onweek";
import Bestseller from "./page/Bestseller";
import Category from "./page/Category";
import CategoryPages from "./page/CategoryPage";
import ProductPages from "./components/ProductPages";
import ScrollToTop from "./components/ScrollToTop";
import ChekoutPage from "./page/ChekoutPage";
import SuccesPage from "./page/SuccesTransaction";

function App() {
  const [cart, setCart] = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const cartRef = useRef(null);

  const clearExpiredSession = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Session expired, user logged out.");
      }
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("Invalid token, user logged out");
    }
  };

  useEffect(() => {
    clearExpiredSession();
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // tutup otomatis
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  // Fungsi untuk menambahkan produk ke dalam cart
  const handleAddToCart = async (product, selectedSize) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("please login before this");
      return;
    }

    if (!selectedSize) {
      toast.info("Please select a size before adding to cart.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity: 1, size: selectedSize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product add to cart", res.data);
      toast.success("Product add to cart");
    } catch (err) {
      console.log("Failed add product", err);
    }
  };

  // Function update cart

  // Fungsi untuk membuka modal produk
  const handleOpenModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // Fungsi untuk menghapus produk dari cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0); // Hapus produk jika quantity <= 0
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } : item)));
  };

  return (
    <div>
      <div className="relative min-h-screen overflow-hidden">
        <div className="relative  z-20">
          <ScrollToTop />

          <Routes>
            <Route element={<MainLayout onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} onClose={handleCloseModal} />}>
              <Route
                path="/"
                element={
                  <div>
                    <Banner style={{ width: "100vh" }} onOpenModal={handleOpenModal} />
                    <div className="">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
                        whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
                        transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
                        viewport={{ once: true }}
                      >
                        <p class="text-lg  md:text-2xl font-bold text-center mt-4">
                          Latest <span className="text-yellow-500">Arrival</span>
                        </p>
                      </motion.div>
                      <div className=" flex justify-content-center gap-4 " style={{ width: "100%" }}>
                        <main className="flex-1 px-6">
                          <ProductList onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />
                        </main>
                      </div>
                    </div>
                    <Bestseller onOpenModal={handleOpenModal} />
                    <Onweek onOpenModal={handleOpenModal} />
                    <Category onOpenModal={handleOpenModal} />
                  </div>
                }
              />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products/category/:categoryName" element={<CategoryPages onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />} />
              <Route path="/products" element={<ProductPages onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />} />
              <Route path="/chekout" element={<ChekoutPage cart={cart} onRemoveFromCart={removeFromCart} onQuantityChange={handleQuantityChange} decreaseQuantity={decreaseQuantity} onClose={() => setIsCartOpen(false)} />} />
              <Route path="/orders" element={<OrderPages />} />
              <Route path="/success-order" element={<SuccesPage />} />
            </Route>

            <Route path="/admin-login" element={<AdminLoginPage />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="/admin/product" element={<Product />} />
              <Route path="/admin/transaction" element={<Transaction />} />
              <Route path="/admin/user" element={<AdminUserList />} />
            </Route>
          </Routes>

          {isSidebarOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />

              <motion.div initial={{ x: "0%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 500, damping: 40 }}>
                <Sidebar
                  user={user}
                  closeSidebar={() => setIsSidebarOpen(false)}
                  onLogout={() => {
                    localStorage.clear();
                    setUser(null);
                    setIsSidebarOpen(false);
                  }}
                />
              </motion.div>
            </>
          )}

          {isCartOpen && (
            <>
              {/* Overlay dengan efek fade-in */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black z-40" onClick={() => setIsCartOpen(false)} />
              {/* Shopping Cart dengan animasi slide-in */}
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 1200, damping: 100 }} className="fixed right-0 top-0 h-full w-full bg-white z-50 shadow-lg">
                {/* bg gelap */}
                <div ref={cartRef}>
                  <ShoppingCart
                    cart={cart}
                    onRemoveFromCart={removeFromCart}
                    onQuantityChange={handleQuantityChange}
                    decreaseQuantity={decreaseQuantity}
                    onClose={() => setIsCartOpen(false)} // Menutup sidebar
                  />
                </div>
              </motion.div>
            </>
          )}

          {isModalOpen && <ProductModal product={currentProduct} onAddToCart={handleAddToCart} onClose={handleCloseModal} />}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
