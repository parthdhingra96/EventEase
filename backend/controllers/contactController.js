
const db = require("../config/db");

const sendContactMessage = (req, res) => {

    const { full_name, email, mobile, message } = req.body;

    if (!full_name || !email || !mobile || !message) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO contact_messages
        (full_name, email, mobile, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [full_name, email, mobile, message],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Unable to send message"
                });
            }

            res.status(201).json({
                message: "Your message has been sent successfully!",
                messageId: result.insertId
            });
        }
    );
};

module.exports = { sendContactMessage };
