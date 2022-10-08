// const mysql = require("mysql2/promise");

const Knex = require("knex");

const mysqlConnectionString = {
  host: "127.0.0.1",
  user: "root",
  password: "root@2017",
  database: "zocket_database",
  port: 3306,
};

const KNEX_CONFIG = {
  client: "mysql",
  connection: mysqlConnectionString,
};

const knex = Knex(KNEX_CONFIG);
const data = {
  knex: knex,
};
module.exports = data;
