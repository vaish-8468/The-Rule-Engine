const mongoose=require('mongoose');

//whenever an alert will be generated, it will be stored in this format
const Alert = new mongoose.Schema({
  timestamps: true},
  {
  location_type: {
    type: String,
    required: true,
  },
  violationCount: {
    type: Number,
    Default: 1,
  }

});

  
module.exports = mongoose.model('Alert', Alert);
  