import connection from "../config/db_connection.js";
import bcrypt from "bcrypt"


const userService =
    {
        getAllUsers() {
            let myResult = []
            myResult = connection.promise().query("SELECT * FROM user")
            return myResult
        },
        async insertUser(name, email, password) {

            const hashedPassword = await bcrypt.hash(password, 10)
            const [result] = await connection.promise().query("INSERT INTO user (name , email ,password) VALUES(? , ? , ? )", [name, email, hashedPassword])
        }
        ,

        async findUserById(id) {
            try {
                const [rows] = await connection.promise().query("SELECT * FROM user WHERE id = ?", [id]);

                if (rows.length === 0) {
                    throw new Error("User with the given id does not exist!");
                }

                return rows[0];
            } catch (err) {
                throw err;
            }
        }
        ,

        async deleteUserById(id) {
            try {
                this.findUserById(id)
            } catch (e) {
                throw e;
            }

            try {
                await connection.promise().query("DELETE  FROM user WHERE id = ?", [id]);
            } catch (e) {
                throw e
            }

        }
        ,

        async updateUser(userId, userObject) {
            try {
                await this.findUserById(userId)
            } catch (e) {
                throw e
            }
            try {
                const hashedPassword = await bcrypt.hash(userObject.password, 10)
                await connection.promise().query("UPDATE user SET name =  ? , email = ?, password = ? WHERE id = ?", [userObject.name, userObject.email, hashedPassword, userId])
            } catch (e) {
                throw e
            }

        }
        ,

        async findUserByEmail(email) {
            try {
                const [rows] = await connection.promise().query("SELECT * FROM user WHERE email = ?", [email])
                if (rows.length === 0)
                    throw new Error("User does not exist")
                return rows[0];
            } catch (e) {
                throw e;
            }
        }
        ,

        async uploadProfilePic(id, path) {
            try {
                await connection.promise().query("UPDATE user SET profile_pic_path = ? WHERE id = ?", [path, id])
            } catch (e) {
                throw e
            }
        }

    }

export default userService