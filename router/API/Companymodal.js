import { createCompany, getCompanies } from "../../controller/Companymodal.js";
import express from "express";

const router = express.Router();

router.post("/getcomapnydata", createCompany);
router.get("/getcomapnydata", getCompanies);

export default router;