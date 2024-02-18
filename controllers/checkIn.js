const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const { isSameDate } = require('./supportFuctions/isSameDate');

/**
 * 
 *  The basic Assumptions are if the checkIn would be first time 
 *      then it directly push to db 
 * If not then 
 *      then we check the what would be the last checkout time
 *      if it is availabe the check new checkIn should be greater than the previous checkout
 *      if checkout is not availabe the it's should allow to checkin without admin interventions
 *          so in this step admin came to play he will pass the todays date and for checkout
 *      user can only chekin is any check out is present except the first time
 * 
 */


const checkIn = async(req,res)=>{
    try {
        const {employeeId} = req.params;
        const { checkInTime , date} = req.body;

        if(!isUTCDateString(checkInTime) || !date || !isUTCDateString(date)){
            return res.status(400).json({error:true,message:"dates should be in UTC format"})
        }

        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
          return res.status(404).json({ error: 'employee not found', message: {employeeId : "XYZ12"} });
        }
    
         // Get today's date
         let today;
         if(date){
            today = new Date(date);
            if(today){
                // today = new Date();
                today.setUTCHours(0, 0, 0, 0);
            }else{
                return res.status(404).json({ error: 'Invalid Date',message:{data : "12/02/2002"} });
            }
         }else{
            today = new Date();
            today.setUTCHours(0, 0, 0, 0); // Set hours to 00:00:00:000 for comparison
        }
        
        // console.log("===>",today);
         // Check if the check-in time belongs to the same date as today
         if (!isSameDate(new Date(checkInTime), today)) {
            return res.status(400).json({ message: 'Check-in time should belong to the same date as today' });
          }
     
         // Find or create the attendance record for today
         let attendance = await Attendance.findOne({ employee: employee._id, date: today });
         
         // If attendance record for today does not exist, create a new one
         if (!attendance) {
            console.log("saving...");
           attendance = new Attendance({
            // employeeId,
             employee: employee._id,
             date: today,
             checkIns: [{ checkInTime }]
           });
           console.log("saved");
         } else {
             // If attendance record for today exists, check if the new check-in time is greater than the last check-out time
            const lastCheckOutTime = attendance.checkIns[attendance.checkIns.length - 1].checkOutTime;
            if (!lastCheckOutTime) {
              return res.status(400).json({ message: "You Did'nt checkout previously Please Contact to Manager" });
            }else if(new Date(checkInTime) <= lastCheckOutTime) {
                return res.status(400).json({ message: 'Check-in time should be greater than the last check-out time For Same Day' });
            }
            // console.log(new Date(checkInTime) ,lastCheckOutTime, new Date(checkInTime) <= lastCheckOutTime);
           // If attendance record for today exists, push the new check-in time to the checkIns array
           attendance.checkIns.push({ checkInTime });
         }
    
         await attendance.save()
        return res.status(200).json({ message: 'Check-in recorded successfully' });
      } catch (err) {
        return res.status(500).json({ message: err});
        // next(err);
      }
}



function isUTCDateString(dateString) {
    const date = new Date(dateString);
    return date.toISOString() === dateString;
}

module.exports = {
    checkIn
}