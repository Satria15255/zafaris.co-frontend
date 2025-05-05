import React from "react";

const ShoppingCart = ({ cart, onRemoveFromCart, onQuantityChange, decreaseQuantity, onClose }) => {
  // Menghitung total harga
  const totalPrice = cart.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.price * quantity;
  }, 0);

  return (
    <div className="fixed bg-black top-0 right-0 w-full md:w-50  z-50 h-full bg-white flex flex-col items-center p-6">
      {/* Tombol Close */}
      <button onClick={onClose} className="absolute top-4 left-4 text-2xl font-bold text-gray-600 hover:text-gray-900">
        ×
      </button>

      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

      {/* Tabel Cart */}
      <div className="w-full  bg-white  p-6 overflow-x-hidden overflow-y-auto max-h-[70vh]">
        {cart.length === 0 ? (
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
              {cart.map((item) => {
                const quantity = item.quantity || 0;
                return (
                  <tr key={item.id} className="border-b">
                    {/* Produk */}
                    <td className="flex items-center py-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h2 className="text-lg md:text-xl font-medium">{item.name}</h2>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        <div className="flex items-center md:hidden">
                          <button className="px-2 py-1 border rounded" onClick={() => decreaseQuantity(item.id, quantity - 1)}>
                            -
                          </button>
                          <span className="px-4">{quantity}</span>
                          <button className="px-2 py-1 border rounded" onClick={() => onQuantityChange(item.id, quantity + 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <button className="px-2 py-1 border rounded" onClick={() => decreaseQuantity(item.id, quantity - 1)}>
                          -
                        </button>
                        <span className="px-4">{quantity}</span>
                        <button className="px-2 py-1 border rounded" onClick={() => onQuantityChange(item.id, quantity + 1)}>
                          +
                        </button>
                      </div>
                      <button onClick={() => onRemoveFromCart(item.id)} className="text-sm text-gray-500 hover:text-red-500 mt-1">
                        Remove
                      </button>
                    </td>

                    {/* Total Harga per Item */}
                    <td className="text-right text-yellow-500 font-semibold  hidden md:block">${(item.price * quantity).toFixed(2)}</td>
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
              {cart.length > 0 && (
                <h2 className="text-xl font-semibold text-right">
                  <span className="text-yellow-500">${totalPrice.toFixed(2)}</span>
                </h2>
              )}
            </div>
          </div>
          <h2 className="text-sm py-4">Taxes and shipping calculated at checkout</h2>
          <button className="flex justify-content-center w-full py-2 border bg-gray-200 border-black  hover:text-white hover:bg-black hover:text-white transition ">Chek Out</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
