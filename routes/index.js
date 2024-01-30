import express from "express"
import { SignupController, LoginController } from "../controller/authController.js";
import authMiddelwear from "../middlewear/authmiddlewear.js";
import {dashboardValidate, postController } from "../controller/userController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/api/signup", SignupController);
router.post("/api/login", LoginController);

router.get("/api/dashboardvalidate",authMiddelwear,dashboardValidate);
router.post("/api/posts",[upload.any("image"),authMiddelwear],postController)


export default router;
