const cron = require('node-cron');
const { evaluateRule } = require('./ruleService'); // Function to evaluate the rule
const eventsList = require('../mockDB/events'); // Your events list or mock database

const runRuleEveryFiveMinutes = () => {
  cron.schedule('*/5 * * * *', () => {
    const currentTimestamp = new Date();

    // Filter events received in the past five minutes
    const recentEvents = eventsList.filter(event =>
      new Date(event.timestamp) > new Date(currentTimestamp - 5 * 60 * 1000)
    );

    // Evaluate the rule on recent events
    const alertGenerated = evaluateRule(recentEvents); // Function to evaluate the rule based on received events

    if (alertGenerated) {
      console.log('Alert generated based on the rule!');
      // Logic to generate and store the alert in the database
      // ...
    }
  });
};

module.exports = {
  runRuleEveryFiveMinutes,
};
e