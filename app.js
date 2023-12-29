require('dotenv').config();
const express = require('express');
const Routes = require('./src/routes/routes');
const cors=require('cors');
const schedule=require('node-schedule');
// const { runRuleEveryFiveMinutes } = require('../TheRuleEngine/src/routes/runRuleEveryFiveMinutes');
const connectDB = require('./src/mockDB/mongoDB'); // Assuming this sets up the database connection

const app = express();
const PORT = 3000;


// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/v1', Routes);


// Run the rule every 5 minutes
// runRuleEveryFiveMinutes();

// Start the server
const username=encodeURIComponent(process.env.USERNAME);
const password=encodeURIComponent(process.env.PASSWORD);
const connectionString=`mongodb+srv://${username}:${password}@cluster0.vu5eoiq.mongodb.net/ruleEngine?retryWrites=true&w=majority`;

const server= async () =>{
  try{
    await connectDB(connectionString);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  catch(error){
    console.log(error);
  }
}

server();


process.on('SIGINT', function () { 
  schedule.gracefulShutdown()
  .then(() => process.exit(0))
});

// Close the database connection on app termination
// process.on('SIGINT', () => {
//   db.end((err) => {
//     if (err) {
//       console.error('Error closing database connection:', err);
//     } else {
//       console.log('Database connection closed');
//       process.exit(0);
//     }
//   });
// });
