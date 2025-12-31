import Designation from "../Model/Designation.js";

const createDesignation = async (req, res) => {
  try {
    const body = req.body;
    const created = await Designation.create(body);
     res.status(200).json({ message: "Designation created", data: created });
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

const getDesignations = async (req, res) => {
  try {
    const data = await Designation.find();
     res.status(200).json(data);
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

export { createDesignation, getDesignations };