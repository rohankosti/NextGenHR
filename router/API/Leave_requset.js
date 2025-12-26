import { createLeaveRequest, getLeaveRequests, getLeaveRequestById, updateLeaveRequest, deleteLeaveRequest } from "../../controller/Leave_requset.js";
import express from "express";

const router = express.Router();

router.post("/leaverequest", createLeaveRequest);
router.get("/getleaverequest", getLeaveRequests);
router.post("/singleleaverequest", async (req, res) => {
  const { id } = req.body;
  await getLeaveRequestById({ params: { id } }, res);
});
router.put("/updatedleaverequest/:id", updateLeaveRequest);
router.delete("/delateleaverequest/:id", deleteLeaveRequest);

export default router;
