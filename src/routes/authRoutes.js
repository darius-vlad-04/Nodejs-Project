import express from 'express'
import authController from "../controllers/authController.js";
import tokenValidation from "../middlewares/verifyTokenMiddleware.js"
import schema from "../validation_schemas/schemas.js"
import validate from "../middlewares/validationMiddleware.js"
const authRoutes = express.Router();

authRoutes.post("/signup", validate(schema.userSchema), authController.signup)
authRoutes.post("/login", authController.login)
authRoutes.get("/logout", tokenValidation, authController.logout)
export default authRoutes