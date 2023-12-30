const mongoose=require('mongoose');
const uuid = require('uuid');

//whenever an alert will be generated, it will be stored in this format
const Alert = new mongoose.Schema({
  
  alertId: {
    type: String,
    default: uuid.v1,
  },
  vehicleId: {
    type: String,
    required: true,
  },

  location_type: {
    type: String,
    required: true,
  },
  violationCount: {
    type: Number,
    Default: 1,
  }

},{
  timestamps: true},

);

  
module.exports = mongoose.model('Alert', Alert);
  