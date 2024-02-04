import express from "express"
import { SignupController, LoginController } from "../controller/authController.js";
import authMiddelwear from "../middlewear/authmiddlewear.js";
import {allPostController, dashboardValidate, delPostController, postController, searchPostsController, updatePostController } from "../controller/userController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/api/signup", SignupController);
router.post("/api/login", LoginController);

router.get("/api/dashboardvalidate",authMiddelwear,dashboardValidate);
router.post("/api/posts",[authMiddelwear,upload.any("image")],postController);
router.get("/api/allpost",authMiddelwear,allPostController);
router.delete("/api/delpost/:id",authMiddelwear,delPostController);
router.put("/api/updatepost/:id",updatePostController);
router.get("/api/search-posts",authMiddelwear,searchPostsController)
export default router;
