const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { createEmployee } = require('../controllers/employeeController');

router.post('/create', createEmployee);
  
  module.exports = router;
  
  