
const db = require("../config/db");

// Create a new booking
const createBooking = (req, res) => {
    const {
        event_id,
        event_name,
        event_category,
        guest_count,
        event_date,
        budget,
        event_location,
        requirements
    } = req.body;

    if (
        !event_id ||
        !event_name ||
        !event_category ||
        !guest_count ||
        !event_date ||
        !budget ||
        !event_location
    ) {
        return res.status(400).json({
            message: "Please provide all required booking details"
        });
    }

    const sql = `
        INSERT INTO bookings
        (
            user_id,
            event_id,
            event_name,
            event_category,
            guest_count,
            event_date,
            budget,
            event_location,
            requirements
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        req.user.id,
        event_id,
        event_name,
        event_category,
        Number(guest_count),
        event_date,
        budget,
        event_location,
        requirements || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Booking error:", err.message);

            return res.status(500).json({
                message: "Unable to save booking"
            });
        }

        res.status(201).json({
            message: "Booking saved successfully!",
            bookingId: result.insertId
        });
    });
};

// Get logged-in user's bookings
const getMyBookings = (req, res) => {
    const sql = `
        SELECT *
        FROM bookings
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [req.user.id], (err, results) => {
        if (err) {
            console.error("Fetch bookings error:", err.message);

            return res.status(500).json({
                message: "Unable to fetch bookings"
            });
        }

        res.status(200).json({
            message: "Bookings fetched successfully",
            bookings: results
        });
    });
};
// Cancel a booking
const cancelBooking = (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const sql = `
        UPDATE bookings
        SET status = 'Cancelled'
        WHERE id = ? AND user_id = ? AND status = 'Pending'
    `;

    db.query(sql, [bookingId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to cancel booking"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Booking not found or cannot be cancelled"
            });
        }

        res.status(200).json({
            message: "Booking cancelled successfully"
        });
    });
};

module.exports = { createBooking, getMyBookings,cancelBooking };
