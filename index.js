// backend/index.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize DB
const db = new sqlite3.Database('./orders.db', (err) => {
  if (err) return console.error(err.message);
  console.log('✅ Connected to SQLite DB');
});

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    contact TEXT,
    address TEXT,
    items TEXT
  )
`);

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const { name, contact, address, items } = req.body;
  db.run(
    `INSERT INTO orders (name, contact, address, items) VALUES (?, ?, ?, ?)`,
    [name, contact, address, JSON.stringify(items)],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(201).json({ orderId: this.lastID });
    }
  );
});
// GET /api/orders/:id
app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM orders WHERE id = ?`, [id], (err, row) => {
      if (err) return res.status(500).send(err.message);
      if (!row) return res.status(404).send("Order not found");
      row.items = JSON.parse(row.items); // parse items JSON
      res.json(row);
    });
  });
  // GET /api/orders (Admin)
app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders', (err, rows) => {
      if (err) return res.status(500).send(err.message);
      rows.forEach(row => row.items = JSON.parse(row.items)); // Parse items
      res.json(rows);
    });
  });
  // PUT /api/orders/:id (Admin)
app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id], function (err) {
      if (err) return res.status(500).send(err.message);
      if (this.changes === 0) return res.status(404).send("Order not found");
      res.send("Order status updated");
    });
  });
  // POST /api/products (Admin)
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, [name, price], function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID, name, price });
    });
  });
  // DELETE /api/products/:id (Admin)
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
      if (err) return res.status(500).send(err.message);
      if (this.changes === 0) return res.status(404).send("Product not found");
      res.send("Product deleted");
    });
  });
  

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
