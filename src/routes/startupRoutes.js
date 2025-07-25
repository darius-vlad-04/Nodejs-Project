import express from 'express'
import startupController from "../controllers/startupController.js";
import tokenValidation from "../middlewares/verifyTokenMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const startupRoutes = express.Router()

startupRoutes.get("/startups", tokenValidation, adminMiddleware, startupController.getAllStartups)
startupRoutes.post("/startups", tokenValidation, startupController.createStartup)
startupRoutes.get("/startups/:id", startupController.getStartupById)
startupRoutes.delete("/startups/:id", tokenValidation, startupController.deleteStartupById)
startupRoutes.put("/startups/:id", tokenValidation, startupController.updateStartupById)

export default startupRoutes