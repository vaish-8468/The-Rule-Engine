
const Alert = require('../models/alert'); // Import the Alert model

// Handle GET /alert/:alert_id endpoint logic
const getAlertById = async (req, res) => {
  try {
  const alertId = req.params.alert_id;

  const alert = await Alert.find({alertId: {$gte : alertId}});
  res.status(200).json({
    message: `The driver has violated the speed limit ${alert.violationCount} times for the location ${alert.location_type}`,
    details: alert});
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
  });
}
}

const postAlert = async (alert) => {
  try {
    const { timestamp, vehicleId, location_type, violationCount} = alert;

    //push the new alert in the database
    const newAlert= await Alert.create({
      timestamp: timestamp,
      vehicleId: vehicleId,
      location_type: location_type, 
      violationCount: violationCount
    });

    console.log(`New alert created at ${timestamp} at the location ${location_type} for the vehicle number ${vehicleId}!`);

  } catch (error) {
    console.log(error);
  }
}

const getLastAlert = async () => {
  try {
    const currentTimestamp = new Date();
    const lastFiveMinutesTimestamp = new Date(currentTimestamp.getTime() - 5 * 60 * 1000);
    console.log('getLastAlert');
    // Find the most recent alert
    const lastAlert = await Alert.findOne({ "createdAt": { "$gte": lastFiveMinutesTimestamp.toISOString() } })
      .sort({ createdAt: -1 })
      .exec();

    if (lastAlert) {
      return Promise.reject(); // An alert exists within the last 5 minutes
    } else {
      return Promise.resolve(); // No alert exists within the last 5 minutes
    }
  } catch (error) {
    console.error('Error retrieving last alert:', error);
    return false; // Handle errors and return false or throw an error
  }
};

  


module.exports = {
  getAlertById,
  postAlert,
  getLastAlert
};
