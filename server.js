const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Sample products data
let products = [
    { id: 1, name: "Tomato", price: 2.99 },
    { id: 2, name: "Carrot", price: 1.49 },
    { id: 3, name: "Potato", price: 0.99 },
  ];
  

// Sample orders data (In-memory storage)
let orders = [
  { id: 1, status: "Pending", items: { 1: 2, 2: 1 }, buyer_name: "John", buyer_contact: "1234567890", delivery_address: "123 Street" },
  { id: 2, status: "In Progress", items: { 3: 3 }, buyer_name: "Jane", buyer_contact: "0987654321", delivery_address: "456 Avenue" },
];

// Get products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get all orders (for Admin)
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Get order by ID (for Order Tracker)
app.get("/api/orders/:id", (req, res) => {
  const order = orders.find((order) => order.id === parseInt(req.params.id));
  if (order) {
    res.json(order); // Return order data including its status
  } else {
    res.status(404).send("Order not found");
  }
});

// Place a new order
app.post("/api/orders", (req, res) => {
  const { name, contact, address, products } = req.body;
  
  // Create a new order object with a unique ID
  const newOrder = {
    id: orders.length ? Math.max(...orders.map(order => order.id)) + 1 : 1, // Increment ID to avoid conflicts
    name,
    contact,
    address,
    products,
    status: "Pending", // Default status is Pending
  };

  orders.push(newOrder); // Save the order
  res.status(201).json(newOrder); // Return the created order
});

// Update order status (for Admin)
app.put("/api/orders/:id", (req, res) => {
  const order = orders.find((order) => order.id === parseInt(req.params.id));
  if (order) {
    // Validate new status
    const newStatus = req.body.status;
    if (!newStatus) {
      return res.status(400).send("Status is required");
    }

    // Update status
    order.status = newStatus;
    res.json(order); // Return the updated order
  } else {
    res.status(404).send("Order not found");
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
