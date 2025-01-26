const express = require("express");
const path = require("path");

// Import routes
const bookingRoutes = require("./routes/booking"); // Route to handle "show booking"
const bookingsRoutes = require("./routes/bookings"); // Route to handle "show booked data"

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Register API routes
app.use("/api/booking", bookingRoutes); // URL for showing booking data
app.use("/api/bookings", bookingsRoutes); // URL for showing booked data

// New route to show booked data in HTML format
app.get("/booked-data", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "booked-data.html"));
});

// Fallback route to serve the main HTML file for undefined routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
