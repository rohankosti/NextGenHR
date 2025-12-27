import { createLeaveRequest, getLeaveRequests, singalLeaveRequestById, updateLeaveRequest, deleteLeaveRequest } from "../../controller/Leave_requset.js";
import express from "express";

const router = express.Router();

router.post("/leaverequest", createLeaveRequest);
router.get("/getleaverequest", getLeaveRequests);
router.post("/singleleaverequest",singalLeaveRequestById);
router.put("/updatedleaverequest/:id", updateLeaveRequest);
router.delete("/delateleaverequest/:id", deleteLeaveRequest);

export default router;
