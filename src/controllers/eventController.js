const Event = require('../models/event'); // Import the Event model
const Alert = require('../models/alert');
const LocationThreshold= require('../db/locationThresholdMapping');
const { postAlert}=require('../controllers/alertController');


// Handle POST /event endpoint logic
const createEvent = async (req, res) => {
  try {
    const {timestamp, is_driving_safe, vehicle_id, location_type} = req.body;

    //check if the this is the time the vehicle is violating the threshold within five minutes
    //as a result, store the event and generate the alert as well

    await checkEvent(vehicle_id);


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

const checkEvent= async (vehicle_id) => {
  try {
    
    const check= await Alert.find({vehicleId: vehicle_id, createdAt: {$gte: new Date(new Date().getTime()-(5*60*1000)).toISOString(), $lte: new Date().toISOString()}});
    
    if(check){
      check.forEach(alert => {
        if((alert.violationCount+1)>=LocationThreshold[alert.location_type]){
          
          const newAlert= {
            vehicleId: vehicle_id,
            location_type: alert.location_type,
            violationCount: alert.violationCount+1,
          }

          postAlert(newAlert);
          console.log(`Repeatitive speed violations recognized for vehicle number ${vehicle_id}` );

        }
      });
  }
    
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  createEvent,
  checkEvent,
};
