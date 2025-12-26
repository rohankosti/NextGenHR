import reporting_manger from "../Model/reporting_manger.js";

const createReportingManager = async (req, res) => {
  try {
    const body = req.body;
    const created = await reporting_manger.create(body);
    return res.status(200).json({ message: "Reporting Manager created", data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getReportingManagers = async (req, res) => {
  try {
    const data = await reporting_manger.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createReportingManager, getReportingManagers };