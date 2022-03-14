"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index.model");
const basic = require("../../middleware/basicAuth.middleware");
const bearer = require("../../middleware/bearerAuth.middleware");
const acl = require("../../middleware/aclAuth.middleware");
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

router.delete("/deleteUser/:username", acl("delete"), async (req, res) => {
  let userToDelete = req.params.username;
  let user = await User.destroy({ where: { username: userToDelete } });
  res
    .status(201)
    .send(`deleted the following user successfully: ${req.params.username}`);
});

router.put("/update/:username", bearer, acl("update"), async (req, res) => {
  // let updateInfo = req.body;
  let userToUpdate = req.params.username;
  let recordToUpdate = await User.findOne({
    where: { username: userToUpdate },
  });
  let newData = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 5),
    role: req.body.role,
  };
  let updatedUser = await recordToUpdate.update(newData);
  res.status(201).json(updatedUser);
});

module.exports = router;
