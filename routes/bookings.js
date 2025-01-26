const express = require("express");
const pool = require("../db"); // Import the database connection
const router = express.Router();

// Fetch all bookings
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hotel_bookings ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a booking
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM hotel_bookings WHERE id = $1", [id]);
    res.json({ message: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
