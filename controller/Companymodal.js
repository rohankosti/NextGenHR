import Company from "../Model/Company.js";

const createCompany = async (req, res) => {
  try {
    const body = req.body;
    const created = await Company.create(body);
    return res.status(200).json({ message: "Company created", data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json(companies);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createCompany, getCompanies };