import Role from "../Model/Role.js";

const createRole = async (req, res) => {
  try {
    const body = req.body;
    const created = await Role.create(body);
    return res.status(200).json({ message: "Role created", data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const data = await Role.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createRole, getRoles };