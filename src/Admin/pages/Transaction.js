import React, { useEffect, useState } from "react";
import TransactionTable from "../components/TransactionTable";
import axios from "axios";
import TransactionDetails from "../components/TransactionDetails";
import { toast } from "react-toastify";

const Transaction = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/transactions/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder((prev) => prev.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)));

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      toast.success("Order status updated!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full p-4">
      <TransactionTable order={order} onOpenModal={openModal} />

      {selectedOrder && <TransactionDetails order={selectedOrder} onClose={closeModal} onStatusChange={handleStatusChange} />}
    </div>
  );
};

export default Transaction;
