const db = require("../config/db");

// Get all events
const getAllEvents = (req, res) => {
    const sql = "SELECT * FROM events ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to fetch events"
            });
        }

        res.status(200).json({
            message: "Events fetched successfully",
            events: results
        });
    });
};

// Add new event
const createEvent = (req, res) => {
    const {
        event_name,
        category,
        description,
        price,
        image_url,
        location
    } = req.body;

    if (!event_name || !category) {
        return res.status(400).json({
            message: "Event name and category are required"
        });
    }

    const sql = `
        INSERT INTO events
        (event_name, category, description, price, image_url, location)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            event_name,
            category,
            description || "",
            price || 0,
            image_url || "",
            location || ""
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to create event"
                });
            }

            res.status(201).json({
                message: "Event created successfully",
                eventId: result.insertId
            });
        }
    );
};

// Update Event
const updateEvent = (req, res) => {
    const eventId = req.params.id;

    const {
        event_name,
        category,
        description,
        price,
        image_url,
        location
    } = req.body;

    if (!event_name || !category) {
        return res.status(400).json({
            message: "Event name and category are required"
        });
    }

    const sql = `
        UPDATE events
        SET event_name = ?, category = ?, description = ?,
            price = ?, image_url = ?, location = ?
        WHERE id = ?
    `;

    db.query(sql, [
        event_name,
        category,
        description || "",
        price || 0,
        image_url || "",
        location || "",
        eventId
    ], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to update event"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully"
        });
    });
};

 // Delete Event

const deleteEvent = (req, res) => {
    const eventId = req.params.id;

    // Check whether this event has existing bookings
    const checkSql = "SELECT COUNT(*) AS total FROM bookings WHERE event_id = ?";

    db.query(checkSql, [String(eventId)], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to check event bookings"
            });
        }

        if (results[0].total > 0) {
            return res.status(400).json({
                message: "This event has existing bookings and cannot be deleted."
            });
        }

        // Delete event only if no bookings exist
        const deleteSql = "DELETE FROM events WHERE id = ?";

        db.query(deleteSql, [eventId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to delete event"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Event not found"
                });
            }

            res.status(200).json({
                message: "Event deleted successfully"
            });
        });
    });
};


module.exports = {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
};