
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const db = require("../config/db");

router.get("/profile", verifyToken, (req, res) => {

    const sql = `
        SELECT id, full_name, email, mobile, created_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [req.user.id], (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user: results[0]
        });

    });
});

module.exports = router;
