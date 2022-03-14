"use strict";

require("dotenv").config();
const user = require("./users.model");
const contact = require("./contacts.model");
const { Sequelize, DataTypes } = require("sequelize");

const POSTGRES_URI = process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
  database: sequelize,
  User: user(sequelize, DataTypes),
  Contact: contact(sequelize, DataTypes),
};
