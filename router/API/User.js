import { createEmployee,  getEmployees, singleEmploye, updateEmployee, deleteEmployee } from "../../controller/User.js";
import express from "express";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, 'public/uploads/');
 },
 filename: (req, file, cb) => {
   cb(null, Date.now() + '-' + file.originalname);
 }
});
const upload = multer({
 storage: storage,
 limits: { fileSize: 10 * 1024 * 1024 }
});

router.post("/storeEmployee",upload.single('resume'), createEmployee);
router.get("/getregisterdata", getEmployees);
router.post("/singleuserdashboard",singleEmploye)
router.put("/updateduserdashboard/:id", updateEmployee);
router.delete("/deleteuserdashboard/:id", deleteEmployee);

export default router;
