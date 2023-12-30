const event= require('../models/event');
const {getLastAlert, postAlert} = require('../controllers/alertController');
const cron=require('node-cron');


const runRuleEveryFiveMinutes = () => {
  cron.schedule('*/1 * * * *', async () => { //cron style scheduling

    try {
        /*
        this block is executed when there hasn't been any alert generated in last 5 minutes
        */
        const lastAlert = await getLastAlert(); // Function to check the last generated alert

        const currentTimestamp = new Date();
        const time=currentTimestamp.getTime();
        const isoTime=currentTimestamp.toISOString()
        console.log(`The function is working every 5 minutes : ${currentTimestamp}`)
        console.log(`The function is working every 5 minutes getTime : ${time}`)
        console.log(`The function is working every 5 minutes iso : ${isoTime}`)

        // Filter events received in the past five minutes
        const lastFifthMinute= new Date(currentTimestamp.getTime()-(5*60*1000));
        console.log('lastFifthMinute', lastFifthMinute.toISOString());

        if(!lastAlert){
        const recentEvents= await event.find({"createdAt": { "$gte": lastFifthMinute.toISOString(), "$lte": currentTimestamp.toISOString()}});
        console.log('recentEvents');
        //if the lastAlert is false
        //i.e., no alert was generated in the past 5 minutes
        //then, check past 5 minutes records

        // Rule conditions to generate an alert based on location_type and 'is_driving_safe'
        const locationThresholds = {
            highway: 4,
            city_center: 3,
            commercial: 2,
            residential: 1,
        };
    
        const alerts = {}; 
        //we are using dictionary because we need to keep a record of is_driving_safe count 
        //for each location type in the last five minutes
        //Also, we will maintain a dictionary for each vehicleId storing it's corresponding location threshold violations
    
        recentEvents.forEach(event => {
            const { is_driving_safe, vehicle_id, location_type } = event;
            if (is_driving_safe === false) {

              alerts[vehicle_id]=alerts[vehicle_id] || {}; 
              //if the vehicleId is new, it will store an empty dictionary

              alerts[vehicle_id][location_type] = (alerts[vehicle_id][location_type] || 0) + 1; 
              //increase the count of violations
    
              if (alerts[vehicle_id][location_type] >= locationThresholds[location_type]) {
                const newAlert = {
                  timestamp: currentTimestamp,
                  vehicleId: vehicle_id,
                  location_type: location_type,
                  violationCount: alerts[vehicle_id][location_type],
                };
                postAlert(newAlert); // Store the generated alert in the actual database
                console.log(`Alert! The driver of vehicle ID ${vehicle_id} is overspeeding.`, newAlert);
              }
            }
          });
        }else{
            console.log('The driver is driving safely and adhering to the speed limit...');
        }
      }
    
    catch (error) {
        console.log('Alert already generated...');
    }
});
 
}

module.exports = {
  runRuleEveryFiveMinutes,
};
