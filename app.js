const express = require("express");
const path = require("path");

// Import routes
const bookingRoutes = require("./routes/booking"); // Route to handle "show booking"
const bookingsRoutes = require("./routes/bookings"); // Route to handle "show booked data"
const pdfRouter = require("./routes/pdfRouter");  // Import the router


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

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

// Route to render the confirmation page
app.get("/confirmation", (req, res) => {
  const { email, checkIn } = req.query;

  if (!email || !checkIn) {
    return res.status(400).send("Missing email or check-in date in query parameters.");
  }

  try {
    res.render("confirmation", { email, checkIn });
  } catch (error) {
    console.error("Error rendering EJS:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Use the PDF generation route
app.use("/api", pdfRouter);  // Prefix API routes with '/api'


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
