const Employee = require('../models/Employee');

// Create employee
exports.createEmployee = async (req, res) => {
  // console.log(req.body);
  // console.log("file:"+req.file);

  const { firstName, lastName, email, phoneNumber, designation, gender, course } = req.body;
  const image = req.body.image ? req.body.image : null;

  const newEmployee = new Employee({
    firstName,
    lastName,
    email,
    phoneNumber,
    designation,
    gender,
    course,
    image, // Store the image path
  });

  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
