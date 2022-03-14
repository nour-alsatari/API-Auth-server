"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index");
const basic = require("../../middleware/basic.middleware");
const bearer = require("../../middleware/bearer.middleware");
const acl = require("../../middleware/acl.middleware");
const router = express.Router();

router.use(express.json());

router.post("/signup", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 8);
  const record = await User.create(req.body);
  res.status(201).json({ id: record.username, token: record.token });
});

router.post("/signin", basic, (req, res) => {
  res.status(200).json(req.user);
});

router.delete(
  "/deleteUser/:username",
  bearer,
  acl("delete"),
  async (req, res) => {
    let userToDelete = parseInt(req.params.username);
    let user = await Contact.destroy({ where: { username: userToDelete } });
    res.status(201).send(`deleted the following user successfully: ${user}`);
  }
);

module.exports = router;
