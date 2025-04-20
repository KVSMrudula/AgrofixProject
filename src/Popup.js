import React from "react";
import "./styles/popup.css";

const Popup = ({ message, onClose, onTrack }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <div className="popup-buttons">
          {onTrack && <button onClick={onTrack}>Track Now</button>}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
