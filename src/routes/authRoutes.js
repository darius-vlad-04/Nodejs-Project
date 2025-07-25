import express from 'express'
import authController from "../controllers/authController.js";
import authorization from "../middlewares/authMiddleware.js"

const authRoutes = express.Router();

authRoutes.post("/signup" , authController.signup)
authRoutes.post("/login",  authController.login)
authRoutes.get("/logout", authorization, authController.logout)
export default authRoutes