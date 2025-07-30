import connection from "../config/db_connection.js";

const migration =
    {
        async up() {
            try {
                await connection.promise().query("alter table user\n" +
                    "    add profile_pic_path varchar(128) null;")
            } catch (e) {
                throw e
            }

        },

        async down() {
            connection.promise().query("DROP TABLE  startup_tags")
        }
    }


export default migration