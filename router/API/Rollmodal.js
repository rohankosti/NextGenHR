import { createRole, getRoles } from "../../controller/Rollmodal.js";
import express from "express";

const router = express.Router();

router.post("/roledata", createRole);
router.get("/getroledata", getRoles);

export default router;
