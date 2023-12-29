const express = require('express');
const { getAlertById } = require('../controllers/alertController');
const { createEvent } = require('../controllers/eventController');
const router = express.Router();


router.post('/event',createEvent);
router.get('/alert/:alert_id',getAlertById);


module.exports=router;
