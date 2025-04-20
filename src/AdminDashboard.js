import React, { useState, useEffect } from "react";
import axios from "axios";

import './styles/admin-dashboard.css'; // For admin dashboard styles

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [statusForOrder, setStatusForOrder] = useState({});

  // Fetch all orders when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleUpdateStatus = (orderId) => {
    const updatedOrder = { status: statusForOrder[orderId] };

    // Send the updated status to the backend
    axios
      .put(`http://localhost:5000/api/orders/${orderId}`, updatedOrder)
      .then((response) => {
        setOrders(orders.map((order) =>
          order.id === orderId ? { ...order, status: statusForOrder[orderId] } : order
        ));
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusForOrder((prevState) => ({
      ...prevState,
      [orderId]: newStatus
    }));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Manage Orders</h3>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <h4>Order ID: {order.id}</h4>
            <p>Status: {order.status}</p>
            <input
              type="text"
              value={statusForOrder[order.id] || order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              placeholder="Enter new status"
            />
            <button onClick={() => handleUpdateStatus(order.id)}>
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
