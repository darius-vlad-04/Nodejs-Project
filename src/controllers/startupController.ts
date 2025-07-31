import startupService from "../services/startupService.ts";
import Startup from "../interfaces/startup-interfaces/startupInterface.ts";
import IStartupController from "../interfaces/startup-interfaces/startupControllerInterface.ts";
import {Request, Response} from 'express';
import StartupCreateInput from "../interfaces/startup-interfaces/startupCreateInterface.ts";
import StartupUpdateInput from "../interfaces/startup-interfaces/startupUpdateInterface.ts";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

const startupController: IStartupController = {
    getAllStartups: async (req: Request, res: Response): Promise<Response> => {
        try {
            const allStartups: Startup[] = await startupService.getAllStartups();
            return res.status(200).send(allStartups);
        } catch (e: unknown) {
            console.error("Error fetching all startups:", e);
            if (e instanceof Error) {
                return res.status(500).json({error: e.message});
            } else {
                return res.status(500).json({error: "An unknown error occurred while fetching all startups."});
            }
        }
    },

    createStartup: async (req: Request, res: Response): Promise<Response> => {
        try {
            const founderId = req.userId;

            if (founderId === undefined) {
                return res.status(401).json({error: "Authentication required: User ID not found."});
            }

            const startupData: StartupCreateInput = {
                ...req.body,
                founder_id: founderId
            };

            await startupService.createStartup(startupData);
            return res.status(201).json({message: "Successfully created startup!"});
        } catch (e: unknown) {
            console.error("Error creating startup:", e);
            if (e instanceof Error) {
                return res.status(400).json({error: e.message});
            } else {
                return res.status(500).json({error: "An unknown error occurred while creating the startup."});
            }
        }
    },

    getStartupById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({error: "Invalid startup ID provided."});
            }
            const startup: Startup = await startupService.findStartupById(id);
            return res.status(200).send(startup);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return res.status(404).json({error: e.message});
            } else {
                return res.status(500).json({error: "An unknown error occurred while fetching startup by ID."});
            }
        }
    },

    deleteStartupById: async (req: Request, res: Response): Promise<Response> => {
        let startup: Startup | undefined;
        const startupId = parseInt(req.params.id);

        if (isNaN(startupId)) {
            return res.status(400).json({error: "Invalid startup ID provided."});
        }

        try {
            startup = await startupService.findStartupById(startupId);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return res.status(404).json({error: e.message});
            } else {
                return res.status(500).json({error: "An unknown error occurred during startup lookup for deletion."});
            }
        }

        const userId = req.userId;

        if (userId === undefined) {
            return res.status(401).json({error: "Authentication required: User ID not found."});
        }


        if (startup.founder_id !== userId) {
            return res.status(403).json({error: "Unauthorized: You are not the founder of this startup."});
        }

        try {
            await startupService.deleteStartupById(startupId);
            return res.status(200).json({message: "Startup has been deleted!"});
        } catch (e: unknown) {
            console.error("Error deleting startup:", e);
            if (e instanceof Error) {
                return res.status(400).json({error: e.message});
            } else {
                return res.status(500).json({error: "An unknown error occurred during startup deletion."});
            }
        }
    },

    updateStartupById: async (req: Request, res: Response): Promise<Response> => {
        const startupId = parseInt(req.params.id);

        if (isNaN(startupId)) {
            return res.status(400).json({error: "Invalid startup ID provided."});
        }

        try {
            const existingStartup = await startupService.findStartupById(startupId);

            const userId = req.userId;
            if (userId === undefined) {
                return res.status(401).json({error: "Authentication required: User ID not found."});
            }
            if (existingStartup.founder_id !== userId) {
                return res.status(403).json({error: "Unauthorized: You are not the founder of this startup to update it."});
            }


            const startupUpdateData: StartupUpdateInput = req.body;
            await startupService.updateStartupById(startupId, startupUpdateData);
            return res.status(200).json({message: "Startup has been updated!"});
        } catch (e: unknown) {
            console.error("Error updating startup:", e);
            if (e instanceof Error) {
                if (e.message.includes("Startup with given id does not exist!")) {
                    return res.status(404).json({error: e.message});
                }
                return res.status(400).json({error: e.message});
            } else {
                return res.status(500).json({error: "An unknown error occurred during startup update."});
            }
        }
    }
};

export default startupController