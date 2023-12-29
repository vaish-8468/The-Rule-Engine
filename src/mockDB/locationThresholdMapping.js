// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/driver_monitoring', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema
const locationThresholdSchema = new mongoose.Schema({
  location_type: String,
  threshold: Number
});

// Define Model
const LocationThreshold = mongoose.model('LocationThreshold', locationThresholdSchema);

// Insert Sample Data (you can add more documents based on your needs)
LocationThreshold.create({ location_type: 'highway', threshold: 4 }, (err, doc) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Threshold document inserted:', doc);
  }
});

// Retrieve all thresholds
LocationThreshold.find({}, (err, thresholds) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Location thresholds:', thresholds);
  }
});

// Retrieve a specific threshold by location_type
LocationThreshold.findOne({ location_type: 'highway' }, (err, threshold) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Highway threshold:', threshold);
  }
});

// Update a threshold value
LocationThreshold.findOneAndUpdate(
  { location_type: 'highway' },
  { $set: { threshold: 5 } },
  { new: true },
  (err, updatedThreshold) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Updated highway threshold:', updatedThreshold);
    }
  }
);

