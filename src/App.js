// React & Router
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// Third-party
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context & API
import { useCart } from "./context/CartContext";
import { addToCart, getCart, updateCartQuantity, removeCartItem } from "./services/api";

// Layouts
import MainLayout from "./Layouts/MainLayout";
import AdminLayout from "./Layouts/AdminLayout";

// Components
import AdminRoute from "./components/AdminRoute";
import Sidebar from "./components/Sidebar";
import ProductModal from "./components/ProductModal";
import ScrollToTop from "./components/ScrollToTop";

// Pages User
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderPages from "./pages/OrderPages";
import Banner from "./pages/Banner";
import LatestProduct from "./pages/LatestProduct";
import ShoppingCart from "./pages/Cart";
import Bestseller from "./pages/Bestseller";
import HomeCategory from "./pages/HomeCategory";
import ProductPages from "./pages/ProductPages";
import ChekoutPage from "./pages/CheckoutPage";
import OnSale from "./pages/OnSale";
import SuccesPage from "./pages/SuccessTransaction";

// Pages Admin
import AdminLoginPage from "./pages/AdminLoginPage";
import Product from "./Admin/pages/Product";
import Transaction from "./Admin/pages/Transaction";
import AdminUserList from "./Admin/pages/AdminUserList";
import AdminDashboard from "./Admin/pages/Dashboard";

function App() {
  // Cart
  const [cart, setCart] = useCart([]);
  const [items, setItems] = useState([]);

  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Product Modal
  const [currentProduct, setCurrentProduct] = useState(null);

  // User
  const [user, setUser] = useState(null);

  // Utils
  const navigate = useNavigate();

  // Clear expired session
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const res = await getCart();
      setItems(res.data.items);
    } catch (error) {
      console.log("Error fetching cart items", error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function Add Cart Items
  const handleAddToCart = async (product, selectedSize) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen(false);
      return navigate("/login");
    }

    if (!selectedSize) {
      return toast.info("Please select a size before adding to cart.");
    }

    try {
      const res = await addToCart(product._id, 1, selectedSize);
      console.log("Product add to cart", res.data);
      setCart(res.data);
      fetchCartItems();
      toast.success("Product add to cart");
    } catch (err) {
      console.log("Failed add product", err);
    }
  };

  // Function Update Product Quantity
  const updateQuantity = async (productId, size, quantity) => {
    try {
      await updateCartQuantity(productId, size, quantity);
      fetchCartItems();
    } catch (err) {
      console.error("Failed to update cart", err);
    }
  };

  // Function Total Price
  const totalPrice = (items || [])
    .filter((item) => item && item.productId && item.finalPrice)
    .reduce((total, item) => {
      return total + item.finalPrice * item.quantity;
    }, 0);

  // Function Open Proudct Modal
  const handleOpenModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Function Close Product Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // Function Delete Cart Items
  const removeFromCart = async (id, size) => {
    try {
      await removeCartItem(id, size);
      fetchCartItems();
    } catch (err) {
      toast.error("Failed to remove item");
      console.error("Failed remove item", err);
    }
  };

  // Function clear cart
  const clearCartState = () => {
    setItems([]);
    setCart({ items: [] });
  };


  return (
    <div>
      <div className="relative min-h-screen overflow-hidden">
        <div className="relative  z-20">
          <ScrollToTop />
          <Routes>
            <Route element={<MainLayout onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} cartCount={items.length} onClose={handleCloseModal} />}>
              <Route
                path="/"
                element={
                  <div>
                    <Banner onOpenModal={handleOpenModal} />
                    <Bestseller onOpenModal={handleOpenModal} />
                    <LatestProduct onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />
                    <OnSale onOpenModal={handleOpenModal} />
                    <HomeCategory onOpenModal={handleOpenModal} />
                  </div>
                }
              />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductPages onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />} />
              <Route path="/cart" element={<ShoppingCart removeItem={removeFromCart} updateQuantity={updateQuantity} totalPrice={totalPrice} cartItems={items} />} />
              <Route path="/chekout" element={<ChekoutPage cart={cart} cartItems={items} onClearCart={clearCartState} onRemoveFromCart={removeFromCart} />} />
              <Route path="/orders" element={<OrderPages />} />
              <Route path="/success-order" element={<SuccesPage onOpenModal={handleOpenModal} />} />
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
          {isModalOpen && <ProductModal product={currentProduct} onAddToCart={handleAddToCart} onClose={handleCloseModal} />}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
