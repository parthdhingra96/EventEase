const db = require("../config/db");

// Get all bookings for admin
const getAllBookings = (req, res) => {

    const sql = `
        SELECT
            bookings.*,
            users.full_name,
            users.email,
            users.mobile
        FROM bookings
        JOIN users ON bookings.user_id = users.id
        ORDER BY bookings.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to fetch bookings"
            });
        }

        res.status(200).json({
            message: "All bookings fetched successfully",
            bookings: results
        });
    });
};

// Update booking status
const updateBookingStatus = (req, res) => {

    const bookingId = req.params.id;
    const { status } = req.body;

    if (!["Confirmed", "Rejected"].includes(status)) {
        return res.status(400).json({
            message: "Invalid booking status"
        });
    }

    const sql = `
        UPDATE bookings
        SET status = ?
        WHERE id = ? AND status = 'Pending'
    `;

    db.query(sql, [status, bookingId], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to update booking status"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Pending booking not found"
            });
        }

        res.status(200).json({
            message: "Booking status updated successfully"
        });
    });
};
// Get booking statistics
const getBookingStats = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS totalBookings,
            SUM(status = 'Pending') AS pendingBookings,
            SUM(status = 'Confirmed') AS confirmedBookings,
            SUM(status = 'Rejected') AS rejectedBookings
        FROM bookings
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to fetch booking statistics"
            });
        }

        res.status(200).json({
            stats: results[0]
        });
    });
};

// Get all contact messages for admin
const getAllContactMessages = (req, res) => {

    const sql = `
        SELECT *
        FROM contact_messages
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to fetch contact messages"
            });
        }

        res.status(200).json({
            message: "Contact messages fetched successfully",
            messages: results
        });
    });
};

const deleteContactMessage = (req, res) => {

    const messageId = req.params.id;

    const sql = "DELETE FROM contact_messages WHERE id = ?";

    db.query(sql, [messageId], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to delete contact message"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Contact message not found"
            });
        }

        res.status(200).json({
            message: "Contact message deleted successfully"
        });
    });
};
// Get all registered users for admin
const getAllUsers = (req, res) => {

    const sql = `
        SELECT
            id,
            full_name,
            email,
            mobile,
            role,
            created_at
        FROM users
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Unable to fetch users"
            });
        }

        res.status(200).json({
            message: "All users fetched successfully",
            users: results
        });
    });
};
// Update user role
const updateUserRole = (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
        return res.status(400).json({
            message: "Invalid user role"
        });
    }

    const sql = "UPDATE users SET role = ? WHERE id = ?";

    db.query(sql, [role, userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to update user role"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User role updated successfully"
        });
    });
};
// Get recent activity for admin
const getRecentActivity = (req, res) => {
    const sql = `
        SELECT
            'Booking' AS activity_type,
            CONCAT('New booking: ', bookings.event_name, ' by ', users.full_name) AS description,
            bookings.created_at
        FROM bookings
        JOIN users ON bookings.user_id = users.id

        UNION ALL

        SELECT
            'Registration' AS activity_type,
            CONCAT('New user registered: ', full_name) AS description,
            created_at
        FROM users

        ORDER BY created_at DESC
        LIMIT 10
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to fetch recent activity"
            });
        }

        res.status(200).json({
            message: "Recent activity fetched successfully",
            activities: results
        });
    });
};
module.exports = {
    getAllBookings,
    updateBookingStatus,
      getBookingStats,
       getAllContactMessages,
     deleteContactMessage,
     getAllUsers,
updateUserRole,
getRecentActivity
};