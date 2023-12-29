// controllers/alertController.js

const Alert = require('../models/alert'); // Import the Alert model

// Handle GET /alert/:alert_id endpoint logic
const getAlertById = async (req, res) => {
  try {
  const alertId = req.params.alert_id;

  const alert = await Alert.find({_id: {$gte: alertId}});
  res.status(200).json({
    message: `The driver has violated the speed limit for the location ${alert.location_type}`,
    details: alert});
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
  });
}
  

  // // Fetch the alert by ID using the Alert model
  // const alert = Alert.getById(alertId);

  // if (!alert) {
  //   return res.status(404).json({ message: 'Alert not found' });
  // }
  res.send("Not Found");
  // res.status(200).json({ message: 'Alert found', alert });
};


module.exports = {
  getAlertById
};
