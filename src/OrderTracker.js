import React, { useState } from "react";
import axios from "axios";
import './styles/order-tracker.css';   // For order tracker styles

const OrderTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleTrackOrder = () => {
    if (!orderId) {
      setStatusMessage("Please enter a valid Order ID.");
      return;
    }

    // Fetch order status by ID
    axios
      .get(`http://localhost:5000/api/orders/${orderId}`)
      .then((response) => {
        setOrderStatus(response.data.status);
        setStatusMessage("");
      })
      .catch((error) => {
        console.error("Error fetching order status:", error);
        setStatusMessage("Order not found or error fetching status.");
      });
  };

  return (
    <div>
      <h2>Track Your Order</h2>
      <div>
        <label>Enter Order ID:</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleTrackOrder}>Track</button>
      </div>
      {orderStatus && (
        <div>
          <h3>Order Status: {orderStatus}</h3>
        </div>
      )}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default OrderTracker;
