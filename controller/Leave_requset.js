import LeaveRequest from "../Model/LeaveRequest.js";

const createLeaveRequest = async (req, res) => {
  try {
    const body = req.body;
    const created = await LeaveRequest.create(body);
     res.status(200).json({ message: "Leave request created" });
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

const getLeaveRequests = async (req, res) => {
  try {
    const data = await LeaveRequest.find().populate('employee_id', 'first_name last_name');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const singalLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await LeaveRequest.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await LeaveRequest.findByIdAndUpdate(id, payload);
    res.status(200).json({ message: "Leave request updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await LeaveRequest.findByIdAndDelete(id);
    res.status(200).json({ message: "Leave request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  createLeaveRequest,
  getLeaveRequests,
  singalLeaveRequestById,
  updateLeaveRequest,
  deleteLeaveRequest,
};
