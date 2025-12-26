import Register from "../Model/Register.js";

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    const created = await Register.create(body);
    return res.status(200).json({ message: "Employee Data Stored Successfully", data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getLastEmployee = async (req, res) => {
  try {
    const last = await Register.find().sort({ _id: -1 }).limit(1);
    return res.status(200).json(last);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Register.find();
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Register.findById(id);
    return res.status(200).json(emp);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Register.findByIdAndUpdate(id, payload);
    return res.status(200).json({ message: "User Data Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Register.findByIdAndDelete(id);
    return res.status(200).json({ message: "User Data Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createEmployee, getLastEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
