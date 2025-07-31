import perksService from "../services/perksService.ts";
import IPerksController from "../interfaces/perks-interfaces/perksControllerInterface.ts";
import {Request, Response} from 'express';
import Perk from "../interfaces/perks-interfaces/perkInterface.ts";

const perksController: IPerksController =
    {
        getAllPerks: async (req: Request, res: Response): Promise<Response> => {
            try {
                let [allPerks, fields]: [Perk[], any] = await perksService.getAllPerks()
                return res.status(200).send(allPerks)
            } catch (e) {
                if (e instanceof Error)
                    return res.status(400).json({error: e.message})
                else {
                    return res.status(500).json({error: "An unknown error occurred while fetching perks assigned to this startup."});
                }
            }
        },

        createPerk: async (req: Request, res: Response) => {
            try {
                await perksService.createPerk(parseInt(req.params.id), req.body)
                return res.status(200).json({message: "Perk has been added to your startup!"})
            } catch (e) {
                return res.status(400).json({error: "Unable to add perk!"})
            }
        }
    }

export default perksController;