const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
      
// Routes
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
