import Branch from "../Model/Branch.js";

const createBranch = async (req, res) => {
  try {
    const body = req.body;
    const created = await Branch.create(body);
    res.status(200).json({ message: "Branch created", data: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const branchesByCompany = async (req, res) => {
  try {
    const companyName = req.query.companyName;
    // if (!companyName) return res.status(400).json({ message: "companyName query required" });
    const branches = await Branch.find({ comany: companyName });
    res.status(200).json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createBranch, getBranches, branchesByCompany };
