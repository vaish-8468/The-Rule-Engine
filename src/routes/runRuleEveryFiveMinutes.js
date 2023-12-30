const event= require('../mockDB/events');
const {getLastAlert, postAlert} = require('../mockDB/alerts');
const cron=require('node-cron');




const runRuleEveryFiveMinutes = () => {
  cron.schedule('*/5 * * * *', () => { //cron style scheduling
    const currentTimestamp = new Date.now();

   

    // Check if an alert was generated in the last 5 minutes
    const lastAlert = getLastAlert(); // Function to get the last generated alert

     // Filter events received in the past five minutes
    const lastFifthMinute= new Date(curentTimestamp.getTime()-(5*60*1000));

    const recentEvents= event.find({createdAt: { $gte: lastFifthMinute.toISOString(), $lte: curentTimestamp}});

    if (!lastAlert) {
      // Rule conditions to generate an alert based on location_type and 'is_driving_safe'
      const locationThresholds = {
        highway: 4,
        city_center: 3,
        commercial: 2,
        residential: 1,
      };

      const alerts = {}; 
      //we are using dictionary because we need to keep a record of is_driving_safe count for each location type in the last five minutes

      recentEvents.forEach(event => {
        const { location_type, is_driving_safe } = event;
        if (is_driving_safe === false) {
          alerts[location_type] = (alerts[location_type] || 0) + 1;

          if (alerts[location_type] >= locationThresholds[location_type]) {
            const newAlert = {
              timestamp: currentTimestamp,
              location_type: location_type,
              violationCount: alerts[location_type],
            };
            postAlert(newAlert); // Store the generated alert in the actual database
            console.log('Alert! The driver is overspeeding.', newAlert);
          }
        }
      });
    }
  });
};

module.exports = {
  runRuleEveryFiveMinutes,
};
