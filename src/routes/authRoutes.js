import express from 'express'
import authController from "../controllers/authController.js";
import tokenValidation from "../middlewares/verifyTokenMiddleware.js"

const authRoutes = express.Router();

authRoutes.post("/signup" , authController.signup)
authRoutes.post("/login",  authController.login)
authRoutes.get("/logout", tokenValidation, authController.logout)
export default authRoutes