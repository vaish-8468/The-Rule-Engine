const uuid=require('uuid');
const Event = require('../models/event'); // Import the Event model

let eventList=[];

// Handle POST /event endpoint logic
const createEvent = async (req, res) => {
  try {
    const {timestamp, is_driving_safe, vehicle_id, location_type} = req.body;


    // Create a new event using the Event model
    const newEvent = await Event.create({
      is_driving_safe: is_driving_safe,
      vehicle_id: vehicle_id,
      location_type: location_type,
    });
  
    res.status(201).json({ message: 'Event created successfully', event: newEvent });

  } catch (error) {
    res.status(500).json({
       message: 'Event creation failed',
       error: error
      });
  }

};

module.exports = {
  createEvent,
};
