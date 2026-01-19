import User from "../Model/User.js";

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    console.log("Uploaded File:", req.file);

    // Add the uploaded file path to the job vacancy data
    if (req.file) {
      // body.resume = req.file.path;
      body.resume = req.file.filename; // Store only the filename
    }
    const created = await User.create(body);
    res
      .status(200)
      .json({ message: "Employee Data Stored Successfully", data: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getLastEmployee = async (req, res) => {
//   try {
//     const last = await User.find().sort({ _id: -1 }).limit(1);
//     return res.status(200).json(last);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

const getEmployees = async (req, res) => {
  try {
    // const  register= req.body
    // console.log(register,"reges");

    const employees = await User.find().populate("company_id", "name");
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const singleEmploye = async (req, res) => {
  try {
    const id = req.body;
    // console.log("ID:", id);

    const emp = await User.findById(id.id).populate("company_id", "name");

    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await User.findByIdAndUpdate(id, payload);
    res.status(200).json({ message: "User Data Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const serchapi = async (req, res) => {
  try {
    const quer = req.query.serch;
    // console.log(quer,"param");

    const serchdata = await User.find({
      $or: [
        { first_name: { $regex: quer, $options: "i" } },
        { email: { $regex: quer, $options: "i" } },
        { role_id: { $regex: quer, $options: "i" } },
        { status: { $regex: quer, $options: "i" } },
      ],
    });
    res.status(200).json(serchdata);
  } catch (error) {
    res.status(500).json({ msg: "Data Can't Be Found" });
  }
};

export {
  createEmployee,
  getEmployees,
  singleEmploye,
  updateEmployee,
  deleteEmployee,
  serchapi,
};
