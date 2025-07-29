import fs from "fs"
import connection from "../config/db_connection.js";
import bcrypt from "bcrypt";

const seedingScripts =
    {
        async seedRole() {
            const roles = fs.readFileSync('./src/seeding_data/rolesDummyData.json', 'utf-8')
            const rolesObj = JSON.parse(roles)
            console.log(rolesObj)
            for (let role of rolesObj) {
                await connection.promise().query("INSERT IGNORE INTO roles (id,`key`) VALUES (?,?) ", [role.id, role.key]);
            }
        }

        ,
        async seedUsers() {
            const users = fs.readFileSync("./src/seeding_data/userDummyData.json", "utf-8")
            const usersObj = JSON.parse(users)
            console.log(usersObj)
            for (let user of usersObj) {
                let created_at = new Date();
                const hashedPassword = await bcrypt.hash(user.password, 10)
                await connection.promise().query("INSERT IGNORE INTO user (name , email , password , profile_bio, created_at) VALUES(?,?,?,?,?)", [user.name, user.email, hashedPassword, user.profile_bio ?? "User currently has no description available", created_at])
            }
        }
        ,
        async seedPermissions() {
            const permissions = fs.readFileSync("./src/seeding_data/permissionDummyData.json", "utf-8")
            const permissionsObj = JSON.parse(permissions)
            for (let permission of permissionsObj) {
                await connection.promise().query("INSERT IGNORE INTO permissions (id, `key`) VALUES(?,?)", [permission.id, permission.key])
            }
        }
        ,
        async seedRolePermissions() {
            const rolePermissions = fs.readFileSync("./src/seeding_data/rolePermissionDummyData.json", "utf-8")
            const rolePermissionsObj = JSON.parse(rolePermissions)
            for (let rolePermission of rolePermissionsObj) {
                await connection.promise().query("INSERT IGNORE INTO roles_permissions (role_id, permission_id) VALUES(?,?)",[rolePermission.role_id, rolePermission.permission_id])
            }
        }
        ,
        async seedData() {
            await this.seedRole().then(this.seedUsers().then(this.seedPermissions().then(this.seedRolePermissions())))
        }
    }

export default seedingScripts