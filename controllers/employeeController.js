const Employee = require('../models/Employee');

const createEmployee = async(req,res) =>{
    try {
        const { employeeId, name, department } = req.body;
        const existingEmployee = await Employee.findOne({ employeeId });
    
        if (existingEmployee) {
          return res.status(400).json({error:true, message: 'Employee already exists' });
        }
    
        const newEmployee = new Employee({
          employeeId,
          name,
          department
        });
    
        await newEmployee.save();
    
        return res.status(201).json({ error:false,message: 'Employee created successfully' });
      } catch (err) {
        return res.status(500).json({error:true, message: err});
      }
}


module.exports = {
    createEmployee
}