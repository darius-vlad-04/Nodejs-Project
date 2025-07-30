import connection from "../config/db_connection.js";

const migration =
    {
        async up() {
            try {
                await connection.promise().query("create table user\n" +
                    "(\n" +
                    "    name        varchar(64)      not null,\n" +
                    "    id          bigint auto_increment\n" +
                    "        primary key,\n" +
                    "    email       varchar(64)      not null,\n" +
                    "    password    varchar(64)      not null,\n" +
                    "    created_at  datetime         null,\n" +
                    "    profile_bio varchar(1024)    null,\n" +
                    "    role_id     bigint default 2 not null,\n" +
                    "    constraint user_unique\n" +
                    "        unique (email),\n" +
                    "    constraint user_roles_id_fk\n" +
                    "        foreign key (role_id) references roles (id)\n" +
                    ");")
            } catch (e) {
                throw e
            }

        },

        async down() {
            connection.promise().query("DROP TABLE  user")
        }
    }


export default migration