import connection from "../config/db_connection.js";

const migration =
    {

        async up() {
            try {
                connection.promise().query("create table migrations\n" +
                    "(\n" +
                    "    id          bigint\n" +
                    "        primary key,\n" +
                    "    description varchar(128) null,\n" +
                    "    timestamp   datetime     null\n" +
                    ");")
            } catch (e) {
                throw e
            }
        },

        async down() {
            connection.promise().query("DROP TABLE  migrations")
        }
    }

export default migration