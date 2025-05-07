import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Cart";
import ProductModal from "./components/ProductModal";
import NavbarSection from "./components/Navbar";
import Banner from "./components/Banner";
import Onweek from "./page/Onweek";
import Bestseller from "./page/Bestseller";
import Category from "./page/Category";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import CategoryPages from "./page/CategoryPage";
import ProductPages from "./components/ProductPages";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);

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
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Jika produk sudah ada, tambah quantity
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item));
      } else {
        // Jika produk belum ada, tambahkan ke cart dengan quantity awal = 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

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
    <>
      <ScrollToTop />
      <NavbarSection cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} onClose={handleCloseModal} />
      <Routes>
        <Route path="zafaris.co/products/:category" element={<CategoryPages onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />} />
        <Route path="/zafaris.co/products" element={<ProductPages onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />} />

        <Route
          path="/zafaris.co"
          element={
            <>
              <Banner style={{ width: "100vh" }} />

              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-col-8">
                  <Onweek />
                </div>
                <div className="flex-col-4">
                  <Bestseller />
                </div>
              </div>
              <Category />

              {/* List Product */}
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
                whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
                transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
                viewport={{ once: true }}
              >
                <div class="flex flex-col justify-center items-center h-40   ">
                  <p class="text-lg  md:text-5xl font-bold text-dark">Feature Products</p>
                </div>
              </motion.div>
              <div className="min-h-screen flex justify-content-center gap-4 " style={{ width: "100%" }}>
                <div className="flex flex-col">
                  <main className="flex-1 p-6">
                    <ProductList onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />
                  </main>
                </div>
              </div>
              {/* List Product */}
            </>
          }
        />
      </Routes>
      {isCartOpen && (
        <>
          {/* Overlay dengan efek fade-in */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black z-40" onClick={() => setIsCartOpen(false)}></motion.div>
          {/* Shopping Cart dengan animasi slide-in */}
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 1200, damping: 50 }} className="fixed right-0 top-0 h-full w-50 bg-white z-50 shadow-lg"></motion.div>
          {/* bg gelap */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsCartOpen(false)}></div>
          <div ref={cartRef}>
            <Sidebar
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onQuantityChange={handleQuantityChange}
              decreaseQuantity={decreaseQuantity}
              onClose={() => setIsCartOpen(false)} // Menutup sidebar
            />
          </div>
        </>
      )}

      {isModalOpen && <ProductModal product={currentProduct} onAddToCart={handleAddToCart} onClose={handleCloseModal} />}
      <Footer style={{ width: "100vh" }} />
    </>
  );
}

export default App;
