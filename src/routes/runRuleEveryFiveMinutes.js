// ... (Other required imports)

const eventsList = require('../mockDB/events');
const { storeAlert } = require('../mockDB/alerts');

const runRuleEveryFiveMinutes = () => {
  cron.schedule('*/5 * * * *', () => { //cron style scheduling
    const currentTimestamp = new Date();

    // Filter events received in the past five minutes
    const recentEvents = eventsList.filter(event =>
      new Date(event.timestamp) > new Date(currentTimestamp - 5 * 60 * 1000)
    );

    // Check if an alert was generated in the last 5 minutes
    const lastAlert = getLastAlert(); // Function to get the last generated alert
    const alertGeneratedRecently = lastAlert && new Date(lastAlert.timestamp) > new Date(currentTimestamp - 5 * 60 * 1000);

    if (!alertGeneratedRecently) {
      // Rule conditions to generate an alert based on location_type and 'is_driving_safe'
      const locationThresholds = {
        highway: 4,
        city_center: 3,
        commercial: 2,
        residential: 1,
      };

      const alerts = {};

      recentEvents.forEach(event => {
        const { location_type, is_driving_safe } = event;
        if (is_driving_safe === false) {
          alerts[location_type] = (alerts[location_type] || 0) + 1;

          if (alerts[location_type] >= locationThresholds[location_type]) {
            const newAlert = {
              timestamp: currentTimestamp,
              location_type,
              // Other alert properties...
            };
            storeAlert(newAlert); // Store the generated alert in the mock database or actual database
            console.log('Alert generated:', newAlert);
          }
        }
      });
    }
  });
};

module.exports = {
  runRuleEveryFiveMinutes,
};
