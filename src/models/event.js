const mongoose= require('mongoose');

const event=  new mongoose.Schema({

  timestamp : true,
},{
    
  is_driving_safe:{
    type : Boolean,
    required: [true,'must be a boolean value'],
  },
  vehicle_id: {
    type: String,
    required: [true,'must be an object id'],
  },
  location_type: {
    type: String,
    required: [true,'must be a string'],
    trim: true,
  }, 
})

module.exports = mongoose.model('Event',event);


// class Event {
//     constructor(timestamp, is_driving_safe, vehicle_id, location_type) {
//       this.timestamp = timestamp;
//       this.is_driving_safe = is_driving_safe;
//       this.vehicle_id = vehicle_id;
//       this.location_type = location_type;
//     }
  
//     // Example method for creating a new event
//     static createNewEvent(timestamp, is_driving_safe, vehicle_id, location_type) {
//       // const eventId = generateUniqueId(); // Function to generate unique event ID
//       return new Event(timestamp, is_driving_safe, vehicle_id, location_type );
//     }
  
//     // Other methods for event operations could be defined here
//   }
  
//   module.exports = Event;
  