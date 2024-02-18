const mongoose = require('mongoose');

const attendnceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  // employeeId:{type:String,required:true},
  checkIns: [{
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date }
  }],
  date: { type: Date, required: true }
});


attendnceSchema.index({ employee: 1, date: 1 }, { unique: true });


module.exports = mongoose.model('Attendance', attendnceSchema);