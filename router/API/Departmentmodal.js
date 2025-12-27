import { createDepartment, getDepartments, singleDepartmentById, updateDepartment, deleteDepartment } from "../../controller/Departmentmodal.js";
import express from "express";

const router = express.Router();

router.post("/departmentdataapi", createDepartment);
router.get("/getdepartmentdata", getDepartments);
router.post("/singledata",singleDepartmentById);
router.put("/Updateddata/:id", updateDepartment);
router.delete("/Deletedata/:id", deleteDepartment);

export default router;
