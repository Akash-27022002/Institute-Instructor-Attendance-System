const express = require('express');
const router = express.Router();
const { checkIn } = require('../controllers/checkIn');
const { checkOut } = require('../controllers/checkOut');

// API for recording check-in time
router.post('/checkin/:employeeId',checkIn);

// API for recording check-out time
router.post('/checkout/:employeeId',checkOut);




module.exports = router;
