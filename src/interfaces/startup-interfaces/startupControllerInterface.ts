import {Request, Response} from 'express';

interface IStartupController {
    getAllStartups: (req: Request, res: Response) => Promise<Response>;
    createStartup: (req: Request, res: Response) => Promise<Response>;
    getStartupById: (req: Request, res: Response) => Promise<Response>;
    deleteStartupById: (req: Request, res: Response) => Promise<Response>;
    updateStartupById: (req: Request, res: Response) => Promise<Response>;
}

export default IStartupController