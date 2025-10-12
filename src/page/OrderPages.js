import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import { toast } from "react-toastify";

const OrderPages = () => {
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/transactions/mytransactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const handleConfirmReceived = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/transactions/${orderId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order confirmed successfully");
      fetchMyOrders();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to confirm order");
    }
  };

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/transactions/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order cancel successfully");
      fetchMyOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed canceled order");
    }
  };

  return (
    <div>
      <OrderDetails order={orders} handleCancel={handleCancel} handleConfirm={handleConfirmReceived} />
    </div>
  );
};

export default OrderPages;
