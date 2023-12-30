// controllers/alertController.js

const Alert = require('../models/alert'); // Import the Alert model

// Handle GET /alert/:alert_id endpoint logic
const getAlertById = async (req, res) => {
  try {
  const alertId = req.params.alert_id;

  const alert = await Alert.findById({_id: {$gte: alertId}});
  res.status(200).json({
    message: `The driver has violated the speed limit for the location ${alert.location_type}`,
    details: alert});
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
  });
}
}

const postAlert = async (alert) => {
  try {
    const { timestamp, is_driving_safe, vehicle_id, location_type} = alert;

    const newAlert= await Alert.create({timestamp: timestamp, location_type: location_type});

    res.status(200).json({message: `Alert created at ${timestamp}`, details: newAlert});

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const getLastAlert  = async () => {
  const currentTimestamp = Date.now();;

// Find the most recent alert
  Alert.findOne({}, {}, { sort: { 'timestamp': -1 } }, (err, lastAlert) => {
    try {
      if (lastAlert) {
        const lastAlertTimestamp = lastAlert.timestamp;

        // Check if the last alert was generated within the last 5 minutes
        if (lastAlertTimestamp >= new Date(currentTimestamp - 5 * 60 * 1000)) {
          res.status(200).json({message:'Alert exists within the last 5 minutes'});
          return true;
          //handle the case where an alert exists within the last 5 minutes
        } else {
          //no alert exists within the last 5 minutes
          return false; 
        }
      }
    } catch (error) {
      res.status(500).json({message:error.message});
    }
      
    
  });

}

  

  // // Fetch the alert by ID using the Alert model
  // const alert = Alert.getById(alertId);

  // if (!alert) {
  //   return res.status(404).json({ message: 'Alert not found' });
  // }
  // res.status(200).json({ message: 'Alert found', alert });



module.exports = {
  getAlertById,
  postAlert,
  getLastAlert
};
