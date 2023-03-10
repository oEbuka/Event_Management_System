const Event = require("../models/Event");
const attendee = require("../models/Attendee");


exports.addAttendee = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const { name, email } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const attendee = { name, email };
        event.attendees.push(attendee);
        await event.save();

        // Send email to attendee notifying them that they have been added to the event

        res.json({ message: 'Attendee added successfully', attendee });
    } catch (error) {
        next(error);
    }
};

exports.editAttendee = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const attendeeId = req.params.attendeeId;
        const { name, email } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const attendee = event.attendees.id(attendeeId);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }

        attendee.name = name || attendee.name;
        attendee.email = email || attendee.email;
        await event.save();

        // Send email to attendee notifying them that their details have been updated

        res.json({ message: 'Attendee updated successfully', attendee });
    } catch (error) {
        next(error);
    }
};

exports.removeAttendee = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const attendeeId = req.params.attendeeId;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        attendee = event.attendees.id(attendeeId);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }

        attendee.remove();
        await event.save();

        // Send email to attendee notifying them that they have been removed from the event

        res.json({ message: 'Attendee removed successfully', attendee });
    } catch (error) {
        next(error);
    }
};
