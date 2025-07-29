import connection from "../config/db_connection.js"
import fs from 'fs'
import * as path from "node:path";

const migrationsScripts =
    {
        async getLastMigrationVersion() {
            let version
            try {
                version = await connection.promise().query("SELECT MAX(id) as id FROM migrations")
                return version[0][0].id
            } catch (e) {
                return -1
            }

        },


        async applySingleMigration(filename) {
            const fullPath = path.resolve('./src/migrations/', filename);
            let sqlScript
            sqlScript = fs.readFileSync(fullPath, 'utf-8')
            let parts = filename.split("_");
            let migrationDetails = [parts[0], parts.slice(1).join("_")];
            let migrationId = migrationDetails[0]
            let migrationKey = migrationDetails[1].split(".")[0];
            let timestamp = new Date();
            try {
                await connection.promise().query(sqlScript)
                await connection.promise().query("INSERT INTO migrations (id, description, timestamp) VALUES(?,?,?)", [migrationId, migrationKey, timestamp])

            } catch (e) {
                throw e
            }

        },
        async applyMigrations() {
            let latestVersion = await this.getLastMigrationVersion()
            const files = fs.readdirSync('./src/migrations')
            for (let file of files) {
                let migrationId = file.split("_")[0]
                if (migrationId > latestVersion) {
                    await this.applySingleMigration(file)
                }
            }
        }
    }

export default migrationsScripts