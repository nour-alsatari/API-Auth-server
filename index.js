"use strict";

const server = require("./src/server");
require("dotenv").config();
const { database } = require("./src/models/index.model");

database.sync().then(() => {
  server.start(process.env.PORT || 5050);
});
