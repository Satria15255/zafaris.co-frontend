import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// ✅ Tambah token otomatis ke setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =======================
// 🛒 CART
// =======================
export const addToCart = (productId, quantity = 1, size) => API.post("/api/cart/add", { productId, quantity, size });
export const getCart = () => API.get("/api/cart");
export const updateCartQuantity = (productId, size, quantity) => API.put("/api/cart/update", { productId, size, quantity });
export const removeCartItem = (productId, size) => API.delete(`/api/cart/remove/${productId}/${size}`);
export const clearCart = () => API.delete("/api/cart/clear");

// =======================
// 💳 TRANSACTIONS
// =======================
export const createTransaction = (data) => API.post("/api/transactions", data);
export const getAllTransactions = () => API.get("/api/transactions");
export const updateTransactionStatus = (orderId, newStatus) => API.put(`/api/transactions/${orderId}/status`, { status: newStatus });
export const getNewTransactions = () => API.get("/api/transactions/latest");

// =======================
// 💳 ORDERS
// =======================
export const getMyOrders = () => API.get("/api/transactions/mytransactions");
export const confirmOrderReceived = (orderId) => API.patch(`/api/transactions/${orderId}/confirm`);
export const cancelOrder = (Id) => API.put(`/api/transactions/cancel/${Id}`);

// =======================
// 👟 PRODUCTS
// =======================
export const getAllProducts = () => API.get("/api/products");
export const getProductById = (id) => API.get(`/api/products/${id}`);
export const getLatestProducts = () => API.get("/api/products/latest");
export const getBestSellingProducts = () => API.get("/api/products/best-seller");
export const getDiscountProducts = () => API.get("api/products/discounts/today");
// =======================
// 👟 PRODUCTS ADMIN
// =======================
export const createProduct = (data) => API.post("/api/products", data);
export const updateProduct = (id, formData) =>
  API.put(`/api/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);

// =======================
// 👤 USER LIST
// =======================
export const getAllUsers = () => API.get("/api/admin/users");
export const getUserTransactions = (userId) => API.get(`/api/admin/users/${userId}/transactions`);
// =======================
// 👤 AUTH
// =======================
export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);

export default API;
