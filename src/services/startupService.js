import connection from "../config/db_connection.js";

const startupService =
    {
        async getAllStartups() {
            let myResult = []
            try {
                myResult = connection.promise().query("SELECT * FROM startup")
                return myResult
            } catch (e) {
                throw e
            }
        }


        ,
        async createStartup(startupObject) {
            console.log(startupObject)
            let created_at = new Date();
            try {
                await connection.promise().query("INSERT INTO startup(founder_id , name , description,funding_goal,created_at) VALUES(?,?,?,?,?)", [startupObject.founder_id, startupObject.name, startupObject.description, startupObject.funding_goal, created_at])
            } catch (e) {
                throw e
            }
        }


        ,
        async findStartupById(id) {
            try {
                const [rows] = await connection.promise().query("SELECT * FROM startup WHERE id = ?", [id]);

                if (rows.length === 0) {
                    throw new Error("Startup with given id does not exist!");
                }

                return rows[0];
            } catch (err) {
                throw err;
            }
        }
        ,


        async deleteStartupById(id) {
            try {
                let startup = await this.findStartupById(id)
            } catch (e) {
                throw e;
            }
            try {
                await connection.promise().query("DELETE  FROM startup WHERE id = ?", [id]);
            } catch (e) {
                throw e
            }
        },


        async updateStartupById(id, startupObject) {
            try {
                let startup = await this.findStartupById(userId)
            } catch (e) {
                throw e
            }

            try {
                await connection.promise().query("UPDATE startup SET name = ? , description = ? , funding_goal = ?  WHERE id = ?", [startupObject.name, startupObject.description, startupObject.funding_goal, id])
            } catch (e) {
                throw e
            }
        }

    }


export default startupService