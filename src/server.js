"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./error-handlers/500");
const notFound = require("./error-handlers/404");

const unauth = require("./routes/unauthenticated/unauth.route.js");
const auth = require("./routes/authenticated/auth.route.js");
const usersModel = require("./models/users-model");

app.use(express.json());
app.use(cors());
app.use(unauth);
app.use(auth);
app.use(usersModel);

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

app.use(errorHandler);
app.use("*", notFound);

function start(port) {
  app.listen(port, () => {
    console.log(`Server is working on port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
