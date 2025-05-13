import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const [cart, setCart] = useCart();
  const location = useLocation();

  const chekoutItems = location.state?.chekoutItems || cart;

  const items = chekoutItems ?? cart;

  // State untuk form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  // Total harga
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle perubahan input form
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit order
  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      customer: formData,
      items: cart,
      total,
    };

    // Simulasi kirim order (bisa nanti diganti ke fetch/axios POST)
    console.log("Order berhasil dibuat:", order);

    // Kosongkan cart
    setCart([]);

    alert("Order placed successfully!");
  };

  return (
    <div className=" mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>

      {items.length === 0 ? (
        <p>No Product</p>
      ) : (
        <>
          {/* Rincian Cart */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Product:</h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id + item.size} className="flex justify-between">
                  <span>
                    {`${item.name} (${item.size})`} x {item.quantity}
                  </span>
                  <span>$ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right font-bold">Total: ${total.toFixed(2)}</div>
          </div>

          {/* Form Pembeli */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Fullname</label>
              <input type="text" name="name" required onChange={handleChange} className="w-full border placeholder:name px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea name="address" required onChange={handleChange} className="w-full border px-3 py-2 rounded"></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input type="tel" name="phone" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>

            {/* Metode Pembayaran */}
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
