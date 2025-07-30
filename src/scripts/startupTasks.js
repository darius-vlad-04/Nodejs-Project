import migrationsScripts from "./migrationsScripts.js";

export async function runStartupTasks() {


    await migrationsScripts.applyMigrations()

}