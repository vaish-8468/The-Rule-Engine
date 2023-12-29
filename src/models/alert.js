const mongoose=require('mongoose');

//whenever an alert will be generated, it will be stored in this format
const Alert = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  location_type: {
    type: String,
    required: true,
  }
});

  
module.exports = mongoose.model('Alert', Alert);
  