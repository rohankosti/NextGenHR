import { createBranch, getBranches, branchesByCompany } from "../../controller/Brandmodal.js";
import express from "express";

const router = express.Router();

router.post("/branchdata", createBranch);
router.get("/getbranchdata", getBranches);
router.get("/getCompanyWiseBranch", branchesByCompany);

export default router;