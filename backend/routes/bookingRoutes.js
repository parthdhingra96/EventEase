const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    cancelBooking
} = require("../controllers/bookingController");

// Create booking
router.post("/", verifyToken, createBooking);
router.put("/:id/cancel", verifyToken, cancelBooking);

// Get my bookings
router.get("/my-bookings", verifyToken, getMyBookings);

module.exports = router;