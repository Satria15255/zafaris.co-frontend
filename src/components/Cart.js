import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateCartQuantity, removeCartItem } from "../api";

const ShoppingCart = ({ onClose }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Fetch cart items from API
  const fetchCart = async () => {
    try {
      const res = await getCart();
      setItems(Array.isArray(res.data.items) ? res.data.items : []);
    } catch (err) {
      console.error("Failed  to fetch cart", err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Function update quantity
  const updateQuantity = async (productId, size, quantity) => {
    try {
      await updateCartQuantity(productId, size, quantity);
      fetchCart();
    } catch (err) {
      console.error("Failed to update cart", err);
    }
  };

  // Function remove cart
  const removeItemCart = async (productId, size) => {
    try {
      await removeCartItem(productId, size);
      console.log("Remove complete");
      fetchCart();
    } catch (err) {
      console.error("Failed remove item", err);
    }
  };

  const totalPrice = (items || [])
    .filter((item) => item && item.productId && item.price)
    .reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

  console.log(items);
  // Menghitung total harga
  return (
    <div className="fixed bg-black top-0 right-0 w-full md:w-50  z-50 h-full bg-white flex flex-col items-center p-3">
      {/* Tombol Close */}
      <button onClick={onClose} className="absolute top-4 left-4 text-2xl font-bold text-gray-600 hover:text-gray-900">
        ×
      </button>

      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

      {/* Tabel Cart */}
      <div className="w-full  bg-white  p-6 overflow-x-hidden overflow-y-auto max-h-[40vh]">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="hidden md:table-header-group">
              <tr className="border-b">
                <th className="text-left text-xs pb-2">PRODUCT</th>
                <th className="text-center text-xs pb-2">QUANTITY</th>
                <th className="text-right text-xs pb-2">TOTAL</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => {
                return (
                  <tr key={`${item.productId._id} - ${item.size}`} className="border-b">
                    {/* Produk */}
                    <td className="flex items-center py-4">
                      <img src={item.productId.image} alt={item.productId.name} className="w-20 h-20 object-cover rounded mr-4" />
                      <div>
                        <h2 className="text-lg text-sm md:text-xl font-medium">{item.productId.name}</h2>
                        <p className="text-gray-600">Size: {item.size}</p>
                        <p className="text-gray-600">${item.productId.price}</p>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <button className="px-2 py-1 border rounded" onClick={() => updateQuantity(item.productId._id, item.size, item.quantity - 1)}>
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button className="px-2 py-1 border rounded" onClick={() => updateQuantity(item.productId._id, item.size, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <button onClick={() => removeItemCart(item.productId._id, item.size)} className="text-sm text-gray-500 hover:text-red-500 mt-1">
                        Remove
                      </button>
                    </td>

                    {/* Total Harga per Item */}
                    <td>
                      <div className="flex items-center justify-center text-right text-yellow-500 font-semibold  hidden md:block">${item.productId.price * item.quantity}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Total Harga Keseluruhan & chekout */}
      <div className="w-full  bg-gray-100 p-4 mt-4 top-0  ">
        <div>
          <div className=" grid grid-cols-2 ">
            <h2 className="text-xl font-bold text-left">Sub Total</h2>
            <div className="text-right">
              {items.length > 0 && (
                <h2 className="text-xl font-semibold text-right">
                  <span className="text-yellow-500">${totalPrice.toFixed(2)}</span>
                </h2>
              )}
            </div>
          </div>
          <h2 className="text-sm py-4">Taxes and shipping calculated at checkout</h2>
          <button
            onClick={() => {
              navigate("/chekout", {
                state: {
                  chekoutItems: items.map((item) => ({
                    id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    image: item.productId.image,
                    size: item.size,
                    quantity: item.quantity,
                  })),
                },
              });
              onClose();
            }}
            className="flex justify-content-center w-full py-2 border bg-gray-200 border-black  hover:text-white hover:bg-black hover:text-white transition "
          >
            Chek Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
