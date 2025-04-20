import React, { useState } from "react";
import axios from "axios";
import './styles/order-form.css';
import Popup from "./Popup";
import TrackPopup from "./TrackPopup"; // ✅ Import new popup

const OrderForm = ({ products }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProducts, setSelectedProducts] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showTrackPopup, setShowTrackPopup] = useState(false);

  const handleProductChange = (productId, quantity) => {
    setSelectedProducts({
      ...selectedProducts,
      [productId]: quantity,
    });
  };

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const contactRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      alert("Please enter a valid name (alphabets only).");
      return false;
    }
    if (!contactRegex.test(contact)) {
      alert("Please enter a valid 10-digit contact number.");
      return false;
    }
    if (address.trim() === "") {
      alert("Address cannot be empty.");
      return false;
    }
    const selected = Object.values(selectedProducts).filter(qty => qty > 0);
    if (selected.length === 0) {
      alert("Please select at least one product with quantity greater than zero.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const orderData = {
      name,
      contact,
      address,
      products: Object.entries(selectedProducts)
        .filter(([_, qty]) => qty > 0)
        .map(([productId, quantity]) => ({ productId, quantity })),
    };

    axios
      .post("http://localhost:5000/api/orders", orderData)
      .then((response) => {
        setOrderId(response.data.id);
        setOrderStatus("success");
        setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        setOrderStatus("error");
        alert("There was an error placing your order. Please try again.");
      });
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div>
          <h3>Select Products</h3>
          {products.map((product) => (
            <div key={product.id}>
              <label>{product.name} (${product.price})</label>
              <input
                type="number"
                min="0"
                value={selectedProducts[product.id] || 0}
                onChange={(e) => handleProductChange(product.id, parseInt(e.target.value))}
              />
            </div>
          ))}
        </div>

        <button type="submit">Submit Order</button>
      </form>

      {showPopup && (
        <Popup
          message={`Order placed! Your tracking ID is: ${orderId}`}
          onClose={() => setShowPopup(false)}
          onTrack={() => {
            setShowPopup(false);
            setShowTrackPopup(true); // 👉 Open second popup
          }}
        />
      )}

      {showTrackPopup && (
        <TrackPopup
          orderId={orderId}
          name={name}
          onClose={() => setShowTrackPopup(false)}
        />
      )}
    </div>
  );
};

export default OrderForm;
