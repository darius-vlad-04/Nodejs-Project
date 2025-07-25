import userService from "./userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv/config'
import connection from "../config/db_connection.js";

const authService =
    {
        async signup(user) {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            let created_at = new Date();


            try {
                await connection.promise().query("INSERT INTO user (name , email ,password,created_at , profile_bio) VALUES(? , ? , ? ,?,?)", [user.name, user.email, hashedPassword, created_at, user.profile_bio ?? "User currently has no description"])
            } catch (e) {
                throw e
            }
        },


        async login(email, password) {
            let user
            try {
                user = await userService.findUserByEmail(email)
            } catch (e) {
                throw new Error("User with given email does not exist!");
            }
            console.log(user)
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                throw new Error("Wrong password!");
            }

            let [permissions, data] = await connection.promise().query("SELECT p.id FROM user u JOIN roles_permissions rp on u.role_id = rp.role_id JOIN permissions p on rp.permission_id = p.id WHERE u.id =?", [user.id])
            let newPermissions = permissions.map(permission => permission.id)
            const token = jwt.sign({
                    userId: user.id,
                    role: user.role_id,
                    permissions: newPermissions
                }, process.env.TOKEN_SECRET,
                {
                    expiresIn: '6h',
                })

            return token

        }
    }

export default authService