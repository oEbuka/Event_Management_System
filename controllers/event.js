// eventsController.js

const Event = require('../models/Event');


exports.eventById = (req, res, next, id) =>{
  Event.findById(id).exec((err, event )=>{
      if(err || !event){
          return res.status(400).json({
              error : "event not found"
          })
      }
      req.profile = event // adds profile object in req with event info
      next();
  })
};
// Create a new event
exports.createEvent = async (req, res) => {
  try {
    // Get the event details from the request body
    const { name, date, location, description } = req.body;

    // Create a new event object with the details
    const newEvent =  Event({
      name,
      date,
      location,
      description,
      attendees: []
    });

    // Save the event to the database
    await newEvent.save();

    // Return a success message along with the new event object
    return res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    // Handle errors and return an error response
    console.error(error);
    return res.status(500).json({ message: 'Unable to create event' });
  }
};

