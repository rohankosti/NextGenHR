import { login } from "../../controller/Authentication.js";
import express from "express";

const router = express.Router();

router.post("/logindata", login);

export default router;
