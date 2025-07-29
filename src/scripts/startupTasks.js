import migrationsScripts from "./migrationsScripts.js";
import seedingScript from "./seedingScriptsUtils.js";

export async function runStartupTasks() {


    await migrationsScripts.applyMigrations()

}