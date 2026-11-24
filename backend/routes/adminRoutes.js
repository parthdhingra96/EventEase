const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllBookings,
    updateBookingStatus,
    getBookingStats,
      getAllContactMessages,
       deleteContactMessage,
       getAllUsers,
       updateUserRole,
       getRecentActivity
} = require("../controllers/adminController");

// Get all bookings
router.get("/bookings", adminMiddleware, getAllBookings);
router.get("/stats", adminMiddleware, getBookingStats);
router.get("/contact-messages", adminMiddleware, getAllContactMessages);
router.delete("/contact-messages/:id", adminMiddleware, deleteContactMessage);
// Get all registered users
router.get("/users", adminMiddleware, getAllUsers);

// Update booking status
router.put("/bookings/:id/status", adminMiddleware, updateBookingStatus);
// Update user role
router.put("/users/:id/role", adminMiddleware, updateUserRole);
// Get recent activity
router.get("/recent-activity", adminMiddleware, getRecentActivity);

module.exports = router;