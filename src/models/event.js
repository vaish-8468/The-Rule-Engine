const mongoose= require('mongoose');
const uuid=require('uuid');

const event=  new mongoose.Schema({

  eventId: {
    type : String,
    default: uuid.v1,
  } , 
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
},
{
  timestamps: true,
})

module.exports = mongoose.model('Event',event);



  