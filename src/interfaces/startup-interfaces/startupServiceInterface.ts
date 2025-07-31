import Startup from "./startupInterface.ts";
import StartupCreateInput from "./startupCreateInterface.ts";
import StartupUpdateInput from "./startupUpdateInterface.ts";

interface IStartupService {
    getAllStartups(): Promise<Startup[]>;

    createStartup(startupObject: StartupCreateInput): Promise<void>;

    findStartupById(id: number): Promise<Startup>;

    deleteStartupById(id: number): Promise<void>;

    updateStartupById(id: number, startupObject: StartupUpdateInput): Promise<void>;
}

export default IStartupService