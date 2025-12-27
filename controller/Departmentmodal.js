import Department from "../Model/Department.js";
import mongoose from "mongoose";

const createDepartment = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
      
    const created = await Department.create(body);
     res.status(200).json( created );
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    // Populate company and branch names for display in UI
    const departments = await Department.find()
     res.status(200).json(departments);
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

const singleDepartmentById = async (req, res) => {
  try {
    const { id } = req.body;
    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
    const dept = await Department.findById(id)
    
     res.status(200).json(dept);
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Department.findByIdAndUpdate(id, payload);
     res.status(200).json({ message: "Department updated" });
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
     res.status(200).json({ message: "Department deleted" });
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

export { createDepartment, getDepartments, singleDepartmentById, updateDepartment, deleteDepartment };
