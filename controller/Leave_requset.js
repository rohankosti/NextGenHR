import LeaveRequest from "../Model/LeaveRequest.js";

const createLeaveRequest = async (req, res) => {
  try {
    const body = req.body;
    const created = await LeaveRequest.create(body);
    return res.status(200).json({ message: "Leave request created", data: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getLeaveRequests = async (req, res) => {
  try {
    const data = await LeaveRequest.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await LeaveRequest.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await LeaveRequest.findByIdAndUpdate(id, payload);
    return res.status(200).json({ message: "Leave request updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await LeaveRequest.findByIdAndDelete(id);
    return res.status(200).json({ message: "Leave request deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createLeaveRequest, getLeaveRequests, getLeaveRequestById, updateLeaveRequest, deleteLeaveRequest };
