import {Request, Response} from 'express';

interface IPerksController {
    getAllPerks: (req: Request, res: Response) => Promise<Response>;
    createPerk: (req: Request, res: Response) => Promise<Response>;

}

export default IPerksController;