import express from "express"
import { SignupController, LoginController } from "../controller/authController.js";
import authMiddelwear from "../middlewear/authmiddlewear.js";
import dashboardValidate from "../controller/userController.js";
const router = express.Router();

router.post("/api/signup", SignupController);
router.post("/api/login", LoginController);

router.get("/api/dashboardvalidate",authMiddelwear,dashboardValidate);




export default router;
