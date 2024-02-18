// routes/reports.js
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const { report } = require('../controllers/report');

// API for generating aggregated monthly report
router.get('/:employeeId', report);

module.exports = router;
