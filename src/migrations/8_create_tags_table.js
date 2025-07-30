import connection from "../config/db_connection.js";

const migration =
    {
        async up() {

            try {
                await connection.promise().query("create table tags\n" +
                    "(\n" +
                    "    id   bigint auto_increment\n" +
                    "        primary key,\n" +
                    "    name varchar(64) not null\n" +
                    ");\n")
            } catch (e) {
                throw e
            }

        },

        async down() {
            connection.promise().query("DROP TABLE  tags")
        }
    }


export default migration