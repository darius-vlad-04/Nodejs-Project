import connection from "../config/db_connection.ts";
import {ResultSetHeader} from "mysql2";
import StartupUpdateInput from "../interfaces/startup-interfaces/startupUpdateInterface.ts";
import StartupCreateInput from "../interfaces/startup-interfaces/startupCreateInterface.ts";
import Startup from "../interfaces/startup-interfaces/startupInterface.ts";
import IStartupService from "../interfaces/startup-interfaces/startupServiceInterface.ts";

const startupService: IStartupService = {
    async getAllStartups(): Promise<Startup[]> {
        try {
            const [rows] = await connection.promise().query<Startup[]>("SELECT * FROM startup");
            return rows;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error("An unknown error occurred while fetching all startups.");
        }
    },

    async createStartup(startupObject: StartupCreateInput): Promise<void> {
        console.log(startupObject);
        const created_at: Date = new Date();

        try {
            await connection.promise().query<ResultSetHeader>(
                "INSERT INTO startup(founder_id, name, description, funding_goal, created_at) VALUES(?, ?, ?, ?, ?)",
                [startupObject.founder_id, startupObject.name, startupObject.description, startupObject.funding_goal, created_at]
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error("An unknown error occurred while creating a startup.");
        }
    },

    async findStartupById(id: number): Promise<Startup> {
        try {
            const [rows] = await connection.promise().query<Startup[]>("SELECT * FROM startup WHERE id = ?", [id]);

            if (rows.length === 0) {
                throw new Error("Startup with given id does not exist!");
            }
            return rows[0];
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("An unknown error occurred while finding startup by ID.");
        }
    },

    async deleteStartupById(id: number): Promise<void> {
        try {

            await this.findStartupById(id);
            const [result] = await connection.promise().query<ResultSetHeader>("DELETE FROM startup WHERE id = ?", [id]);
            if (result.affectedRows === 0) {
                throw new Error("Failed to delete startup: Startup not found or no rows affected.");
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error("An unknown error occurred during startup deletion process.");
        }
    },

    async updateStartupById(id: number, startupObject: StartupUpdateInput): Promise<void> {
        try {
            await this.findStartupById(id);
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error("An unknown error occurred during startup existence check for update.");
        }

        try {
            const updateFields: string[] = [];
            const updateValues: (string | number)[] = [];

            if (startupObject.name !== undefined) {
                updateFields.push("name = ?");
                updateValues.push(startupObject.name);
            }
            if (startupObject.description !== undefined) {
                updateFields.push("description = ?");
                updateValues.push(startupObject.description);
            }
            if (startupObject.funding_goal !== undefined) {
                updateFields.push("funding_goal = ?");
                updateValues.push(startupObject.funding_goal);
            }

            if (updateFields.length === 0) {
                console.warn(`No fields provided to update for startup ID: ${id}`);
                return;
            }

            const query = `UPDATE startup
                           SET ${updateFields.join(" , ")}
                           WHERE id = ?`;
            await connection.promise().query<ResultSetHeader>(query, [...updateValues, id]);

        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            }
            throw new Error("An unknown error occurred during startup update.");
        }
    }
};


export default startupService