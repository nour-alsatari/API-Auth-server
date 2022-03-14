"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index");
const basic = require("../../middleware/basic.middleware");
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

module.exports = router;
