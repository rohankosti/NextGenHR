import Department from "../Model/Department.js";
import mongoose from "mongoose";

const createDepartment = async (req, res) => {
  try {
    const body = req.body;
    const created = await Department.create(body);
    return res.status(200).json({ message: "Department created", data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
    const dept = await Department.findById(id);
    return res.status(200).json(dept);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await Department.findByIdAndUpdate(id, payload);
    return res.status(200).json({ message: "Department updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    return res.status(200).json({ message: "Department deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment };
