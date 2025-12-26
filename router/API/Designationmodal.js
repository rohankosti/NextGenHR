import { createDesignation, getDesignations } from "../../controller/Designationmodal.js";
import express from "express";

const router = express.Router();

router.post("/designationdataapi", createDesignation);
router.get("/getdesignationdata", getDesignations);

export default router;