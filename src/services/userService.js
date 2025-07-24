import connection from "../config/db_connection.js";
import userModel from "../models/userModel.js";

const userService =
    {
        getAllUsers() {
            let myResult = []
            myResult = connection.promise().query("SELECT * FROM user")
            return myResult
        },
        insertUser(name, email, password) {
            let result
            result = connection.promise().query("INSERT INTO user (name , email ,password) VALUES(? , ? , ? )", [name, email, password])

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
        deleteUserById(id) {
            try {
                this.findUserById(id)
            } catch (e) {
                throw e;
            }
            connection.promise().query("DELETE  FROM user WHERE id = ?", [id]);
            return "User has been deleted"

        }
        ,
        async updateUser(userObject) {
            let userId = userObject.id
            try {
                let user = await this.findUserById(userId)
            } catch (e) {
                throw e
            }

            connection.promise().query("UPDATE user SET name =  ? , email = ?, password = ?", [userObject.name, userObject.email, userObject.password])
            return "User has been updated"

        }

    }

export default userService