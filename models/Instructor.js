const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  instructorId: { type: String, required: true, unique: true },
  checkIns: [{
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date }
  }]
});

module.exports = mongoose.model('Instructor', instructorSchema);
