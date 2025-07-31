import Perk from "./perkInterface.ts";
import PerkCreateInput from "./perkCreateInterface.ts";

interface IPerkService {
    getAllPerks(): Promise<[Perk[], any]>;

    createPerk(startupId: number, perkObject: PerkCreateInput): Promise<void>;

}

export default IPerkService;