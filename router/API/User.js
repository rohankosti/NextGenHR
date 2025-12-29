import { createEmployee,  getEmployees, singleEmploye, updateEmployee, deleteEmployee } from "../../controller/User.js";
import express from "express";

const router = express.Router();

router.post("/storeEmployee", createEmployee);
router.get("/getregisterdata", getEmployees);
router.post("/singleuserdashboard",singleEmploye)
router.put("/updateduserdashboard/:id", updateEmployee);
router.delete("/deleteuserdashboard/:id", deleteEmployee);

export default router;
