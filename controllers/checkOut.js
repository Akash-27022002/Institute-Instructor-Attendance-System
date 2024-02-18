const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const { isSameDate } = require('./supportFuctions/isSameDate');


/**
 * 
 *  The basic Assumptions about  the checkOut
 *      the user must be checkin in.
 *      second thing is it can be checkin today and checkout today then it is ok
 *      but if it checkin today and checkout tommorow then  
 *          we can sent the filed isToday=false
 *          so it can put the status of checkout in last checkIn of that day   
 *              this feature is not availbe for the checkIn fields.
 *     
 * 
 */

const checkOut = async(req,res)=>{
    try {
        const {employeeId} = req.params;
        const {  checkOutTime , isToday = true , date} = req.body;
        if(!isUTCDateString(checkOutTime) || !date ||!isUTCDateString(date)){
            return res.status(400).json({error:true,message:"dates should be in UTC format"})
        }
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        let today;
         if(date){
            today = new Date(date);
            // console.log("todays date",today);
            if(today){
                // today = new Date();
                today.setUTCHours(0, 0, 0, 0);
                // today = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate());
            }else{
                return res.status(404).json({ error: 'Invalid Date',message:{data : "2024-02-16T09:30:00.000Z"} });
            }
         }else{
            today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            // today = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); // Set hours to 00:00:00:000 for comparison
        }
        if (!isToday) {
            // If isToday is not provided or is false, set today to yesterday's date
            today.setDate(today.getDate() - 1);
          }
    
        if (!isSameDate(new Date(checkOutTime), today)) {
            return res.status(400).json({ message: 'Check-Out time should belong to the same date as today' });
          }
    
        let attendance = await Attendance.findOne({ employee:employee._id, date: today });
    
        if (!attendance) {
          return res.status(404).json({ message: 'No Todays Check In found' });
        }
    
        const latestCheckIn = attendance.checkIns[attendance.checkIns.length - 1];
        if (!latestCheckIn || latestCheckIn.checkOutTime) {
          return res.status(400).json({ message: 'No check-in recorded or already checked out' });
        }
    
        // Check if the check-out time is greater than the last check-in time
        if (latestCheckIn.checkInTime >= new Date(checkOutTime)) {
            return res.status(400).json({ message: 'Check-out time should be greater than the last check-in time' });
          }
      
    
        latestCheckIn.checkOutTime =  new Date(checkOutTime);
        await attendance.save();
    
        res.status(200).json({ message: 'Check-out recorded successfully' });
      } catch (err) {
        return res.status(500).json({ message: err});
      }
}

module.exports = {
    checkOut
}