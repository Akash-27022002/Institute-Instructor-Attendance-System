const mongoose = require("mongoose");
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');


const report = async(req,res) =>{
    try {
        const { employeeId } = req.params;
        const { month, year } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        // console.log(employeeId);
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
          return res.status(404).json({error:true ,message: 'Employee not found' });
        }
        const attendance = await Attendance.aggregate([
          {
            $match: {
              employee: new mongoose.Types.ObjectId(employee._id), // Convert employeeId to ObjectId
              date: { $gte: startDate, $lte: endDate } // Filter by date range
            }
          },
          {
            $project: {
              _id:0, // excludes id
              date: 1, // Include date field
              checkIns: {
                $map: {
                  input: "$checkIns",
                  as: "checkIn",
                  in: {
                    checkInTime: "$$checkIn.checkInTime",
                    checkOutTime: "$$checkIn.checkOutTime"
                  }
                }
              }
            }
          }
        ]);
    
      
        return res.status(200).json({error:false, employee,attendance });
      } catch (err) {
        return res.status(500).json({error:true, message: err});
      }
}

module.exports = {
    report
}