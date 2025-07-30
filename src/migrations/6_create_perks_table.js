import connection from "../config/db_connection.js";

const migration =
    {
        async up() {
            try {
               await  connection.promise().query("create table perks\n" +
                    "(\n" +
                    "    id                      bigint auto_increment\n" +
                    "        primary key,\n" +
                    "    title                   varchar(64)   not null,\n" +
                    "    description             varchar(1024) null,\n" +
                    "    minimum_donation_amount bigint        not null\n" +
                    ");\n")
            } catch (e) {
                throw e
            }

        },

        async down() {
            connection.promise().query("DROP TABLE  perks")
        }
    }


export default migration