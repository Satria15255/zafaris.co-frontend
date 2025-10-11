import React from "react";

const OrderDetails = ({ order, handleCancel, handleConfirm }) => {
  if (!Array.isArray(order) || order.length === 0) return <p>Belum ada order.</p>;

  return (
    <div className="p-4">
      {order.map((ord) => (
        <div key={ord._id} className="border mb-6 p-4 rounded-xl shadow">
          <div className="mt-4">
            <h3 className="font-semibold">Order Details:</h3>
            {ord.products.map((item) => (
              <div key={item._id} className="flex justify-between items-center gap-4 mt-2">
                <div className="flex justify-between gap-2 items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">{item.product.name}</p>
                    <div className="flex text-xs gap-2">
                      <p>Size: {item.size}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-yellow-500">${item.subtotal}</p>
              </div>
            ))}
          </div>
          <div>
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
            <button onClick={() => handleCancel(ord._id)} disabled={ord.status === "completed"} className="text-lg border w-1/12 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300">
              Cancel
            </button>
            <button onClick={() => handleConfirm(ord._id)} disabled={ord.status !== "delivered"} className="text-lg border w-1/12 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300">
              Submitted
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
