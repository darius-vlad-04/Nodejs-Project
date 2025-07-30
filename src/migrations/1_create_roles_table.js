import connection from "../config/db_connection.js";

const migration =
    {
        async up() {
            try {
                await connection.promise().query("create table roles\n" +
                    "(\n" +
                    "    id    bigint auto_increment\n" +
                    "        primary key,\n" +
                    "    `key` varchar(128) not null\n" +
                    ");")
            } catch (e) {
                throw e
            }
        },

        async down() {
            connection.promise().query("DROP TABLE  roles")
        }
    }

export default migration