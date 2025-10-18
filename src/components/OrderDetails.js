import React from "react";

const OrderDetails = ({ order, handleCancel, handleConfirm }) => {
  if (!Array.isArray(order) || order.length === 0) return <p>Belum ada order.</p>;

  return (
    <div className="p-2 md:p-4">
      {order.map((ord) => (
        <div key={ord._id} className="border mb-6 p-2 md:p-4 rounded-xl shadow">
          <div className="mt-2 md:mt-4">
            <h3 className="text-[10px] font-semibold">Order Details:</h3>
            {ord.products.map((item) => (
              <div key={item._id} className="flex justify-between items-center gap-4 mt-2">
                <div className="flex justify-between gap-2 items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded" />
                  <div className="flex flex-col">
                    <p className="text-[10px] md:text-lg font-bold">{item.product.name}</p>
                    <div className="flex text-xs gap-2">
                      <p className="text-[10px]">Size: {item.size}</p>
                      <p className="text-[10px]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] font-bold text-yellow-500">${item.subtotal}</p>
              </div>
            ))}
          </div>
          <div className="text-[10px]">
            <p className="flex justify-between">
              <strong>Order Status:</strong>
              {ord.status}
            </p>
            <p className="flex justify-between">
              <strong>Total Product:</strong>
              {ord.totalProducts}
            </p>
            <p className="flex justify-between">
              <strong>Total Price:</strong>${ord.totalPrice}
            </p>
            <p className="flex justify-between">
              <strong>Address:</strong>
              {ord.shippingAddress}
            </p>
            <p className="flex justify-between">
              <strong>Shipping Method:</strong>
              {ord.shippingMethod}
            </p>
            <p className="flex justify-between">
              <strong>Payment Method: </strong>
              {ord.paymentMethod}
            </p>
            <p className="flex justify-between">
              <strong>Ordered on:</strong>
              {new Date(ord.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-end gap-1">
            <button onClick={() => handleCancel(ord._id)} disabled={ord.status === "completed"} className="text-[10px] md:text-lg border w-1/5 md:w-1/12 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300">
              Cancel
            </button>
            <button onClick={() => handleConfirm(ord._id)} disabled={ord.status !== "delivered"} className="text-[10px] md:text-lg border w-1/5 md:w-1/12 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300">
              Submitted
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
