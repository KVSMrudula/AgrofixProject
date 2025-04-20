import React, { useState, useEffect } from "react";
import axios from "axios";

import './styles/style.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/theme.css';
import './styles/hero.css';
import './styles/about.css';

import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import OrderForm from "./OrderForm";
import OrderTracker from "./OrderTracker";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className={`app-container ${theme}`}>
      <Navbar toggleTheme={toggleTheme} />
      <Hero />
      <About />

      <main className="main-content">
      <section id="products">
  <h2>Product Catalog</h2>
  <ul className="product-list">
  {products.map((product) => (
    <li key={product.id} className="product-item">
      <img src={product.image} className="product-image" alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </li>
  ))}
</ul>

</section>

        <section id="order">
          <OrderForm products={products} />
        </section>

        <section id="admin">
          <AdminDashboard />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
