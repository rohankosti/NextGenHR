import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from "../../controller/Departmentmodal.js";
import express from "express";

const router = express.Router();

router.post("/departmentdataapi", createDepartment);
router.get("/getdepartmentdata", getDepartments);
router.post("/singledata", async (req, res) => {
  const { id } = req.body;
  await getDepartmentById({ params: { id } }, res);
});
router.put("/Updateddata/:id", updateDepartment);
router.delete("/Deletedata/:id", deleteDepartment);

export default router;
