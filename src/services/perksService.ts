import connection from "../config/db_connection.ts";
import Perk from "../interfaces/perks-interfaces/perkInterface.ts";
import IPerkService from "../interfaces/perks-interfaces/perkServiceInterface.ts";
import {ResultSetHeader} from "mysql2";
import PerkCreateInput from "../interfaces/perks-interfaces/perkCreateInterface.ts";

const perkService: IPerkService = {
    async getAllPerks(): Promise<[Perk[], any]> {
        let myResult: [Perk[], any] | [] = [];
        try {
            myResult = await connection.promise().query("SELECT * FROM perks") as [Perk[], any];
            return myResult;
        } catch (e: unknown) {
            throw e;
        }
    },

    async createPerk(startupId: number, perkObject: PerkCreateInput): Promise<void> {
        console.log(perkObject);
        try {
            await connection.promise().query<ResultSetHeader>(
                "INSERT INTO perks(title, description, minimum_donation_amount, startup_id) VALUES(?,?,?,?)",
                [perkObject.title, perkObject.description, perkObject.minimum_donation_amount, startupId]
            );
        } catch (e: unknown) {
            throw e;
        }
    }
};


export default perkService