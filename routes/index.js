import express from "express"
import { SignupController, LoginController } from "../controller/authController.js";
const router = express.Router();

router.post("/api/signup", SignupController);
router.post("/api/login", LoginController);

export default router;
