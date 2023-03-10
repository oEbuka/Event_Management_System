// routes.js

const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/event');

// Create a new event
router.post('/events', createEvent);


module.exports = router;
