import express from 'express'
import startupController from "../controllers/startupController.js";
import authorization from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const startupRoutes = express.Router()

startupRoutes.get("/startups", authorization, adminMiddleware, startupController.getAllStartups)
startupRoutes.post("/startups", authorization, startupController.createStartup)
startupRoutes.get("/startups/:id", startupController.getStartupById)
startupRoutes.delete("/startups/:id", authorization, startupController.deleteStartupById)
startupRoutes.put("/startups/:id", authorization, startupController.updateStartupById)

export default startupRoutes