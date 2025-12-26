import { createReportingManager, getReportingManagers } from "../../controller/Reportingmanager_modal.js";
import express from "express";

const router = express.Router();

router.post("/reportingmanagerapi", createReportingManager);
router.get("/getreportingmanager", getReportingManagers);

export default router;
