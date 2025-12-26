import { createEmployee, getLastEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../../controller/Register.js";
import express from "express";

const router = express.Router();

router.post("/storeEmployee", createEmployee);
router.get("/lastemployedata", getLastEmployee);
router.get("/getregisterdata", getEmployees);
router.post("/singleuserdashboard", async (req, res) => {
  const { id } = req.body;
  await getEmployeeById({ params: { id } }, res);
});
router.put("/updateduserdashboard/:id", updateEmployee);
router.delete("/deleteuserdashboard/:id", deleteEmployee);

export default router;
