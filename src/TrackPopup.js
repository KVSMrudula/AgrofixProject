import React from "react";
import "./styles/popup.css";

const TrackPopup = ({ orderId, name, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Track Order</h3>
        <p><strong>Tracking ID:</strong> {orderId}</p>
        <p><strong>Name:</strong> {name}</p>
        <div className="popup-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TrackPopup;
