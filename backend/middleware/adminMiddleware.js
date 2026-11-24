const db = require("../config/db");
const verifyToken = require("./authMiddleware");

const adminMiddleware = (req, res, next) => {

    verifyToken(req, res, () => {

        const sql = "SELECT role FROM users WHERE id = ?";

        db.query(sql, [req.user.id], (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (results.length === 0 || results[0].role !== "admin") {
                return res.status(403).json({
                    message: "Access denied. Admin only."
                });
            }

            next();
        });
    });
};

module.exports = adminMiddleware;