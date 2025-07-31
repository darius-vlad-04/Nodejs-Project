import express, {Router, Request, Response, NextFunction} from 'express';
import startupController from "../controllers/startupController.ts";
import tokenValidation from "../middlewares/verifyTokenMiddleware.ts";


const startupRoutes = express.Router()

startupRoutes.get("/startups", tokenValidation, startupController.getAllStartups)
startupRoutes.post("/startups", tokenValidation, startupController.createStartup)
startupRoutes.get("/startups/:id", startupController.getStartupById)
startupRoutes.delete("/startups/:id", tokenValidation, startupController.deleteStartupById)
startupRoutes.put("/startups/:id", tokenValidation, startupController.updateStartupById)

export default startupRoutes