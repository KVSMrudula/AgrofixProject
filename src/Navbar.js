import React from "react";
import "./styles/navbar.css";

const Navbar = ({ toggleTheme }) => (
  <nav className="navbar">
    <div className="logo">AgroFix</div>
    <ul className="nav-links">
      <li><a href="#products">Products</a></li>
      <li><a href="#order">Place Order</a></li>
      <li><a href="#track">Track Order</a></li>
      <li><a href="#admin">Admin</a></li>
      <li><a href="#about">About Us</a></li>
    </ul>
    <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
  </nav>
);

export default Navbar;
