const express = require("express")
const {addAttendee, editAttendee, removeAttendee} = require('../controllers/attendee');
const {eventById} = require('../controllers/event');




const router = express.Router();


router.post('/events/:id/attendees', addAttendee);
router.put('/events/:eventId/attendees/:attendeeId', editAttendee);
router.delete('/events/:eventId/attendees/:attendeeId', removeAttendee);

// any route containing : eventId, our app will first execute eventById()
router.param("eventId", eventById);

module.exports = router;