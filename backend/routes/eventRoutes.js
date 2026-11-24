
const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

router.get("/", getAllEvents);

router.post("/", adminMiddleware, createEvent);

router.put("/:id", adminMiddleware, updateEvent);

router.delete("/:id", adminMiddleware, deleteEvent);

module.exports = router;
