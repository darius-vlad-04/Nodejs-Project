import express, { Router, Request, Response, NextFunction } from "express";
import perksController from "../controllers/perksController.ts";
import tokenValidation from "../middlewares/verifyTokenMiddleware.ts";
const perksRoutes = express.Router()

perksRoutes.get("/startups/:id/perks", tokenValidation, perksController.getAllPerks)
perksRoutes.post("/startups/:id/perks", tokenValidation, perksController.createPerk)


export default perksRoutes