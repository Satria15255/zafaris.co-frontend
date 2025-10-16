import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createTransaction, clearCart } from "../api";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cart, setCart] = useCart();
  const location = useLocation();
  const chekoutItems = location.state?.chekoutItems || cart;
  const items = chekoutItems && chekoutItems.length > 0 ? chekoutItems : cart;
  const navigate = useNavigate();

  // State untuk form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
    paymentMethod: "cod",
    shippingMethod: "JNT",
  });

  // Total harga
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle perubahan input form
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formatedProducts = [];
      for (const item of items) {
        for (let i = 0; i < item.quantity; i++) {
          formatedProducts.push({
            product: item.id,
            size: item.size,
          });
        }
      }

      const body = {
        products: formatedProducts,
        message: formData.message,
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
        shippingAddress: formData.address,
        voucherCode: "",
        status: "pending_confirmation",
      };

      await createTransaction(body);
      await clearCart();
      toast.success("Transaction success");
      navigate("/success-order");
      setCart([]);
    } catch (error) {
      console.error("Failed to submit order:", error);
      alert("Transaction failed");
    }
  };

  return (
    <div className=" mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Checkout Paes</h2>

      {items.length === 0 ? (
        <div className="h-4/5 border-t">
          <p>No Product</p>
        </div>
      ) : (
        <>
          {/* Rincian Cart */}
          <div className="mb-6">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id + item.size} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 md:w-1/5 rounded-lg" />
                    <div className=" justify-between">
                      <p className="font-bold text-xs md:text-lg">{item.name}</p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {item.size} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-yellow-500 font-bold text-xs md:text-lg">$ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between text-right font-bold text-sm md:text-lg">
              <p>Total:</p>
              <span className="text-yellow-500"> ${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Form Pembeli */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block mb-1 font-medium">Fullname</label>
              <input type="text" name="name" required onChange={handleChange} className="w-full border placeholder:name px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea name="address" required onChange={handleChange} className="w-full border px-3 py-2 rounded"></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">message</label>
              <input name="message" value={formData.message} required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium">phone</label>
              <input type="tel" name="phone" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>

            {/* Metode Pembayaran */}
            <div>
              <label className="block mb-1 font-medium">Shipping Methode</label>
              <select name="shippingMethod" value={formData.shippingMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="JNT">JNT</option>
                <option value="JNE">JNE </option>
                <option value="TIKI">TIKI</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Payment Methode</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="cod">Cash On Delivery (COD)</option>
                <option value="bank">Transfer </option>
                <option value="qris">QRIS</option>
              </select>
            </div>

            {/* Tombol Submit */}
            <button type="submit" className="bg-black text-white py-2 px-4 rounded right-0 hover:bg-gray-800">
              Make Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
