"use strict";

const express = require("express");
const bearer = require("../../middleware/bearerAuth.middleware");
const acl = require("../../middleware/aclAuth.middleware");
const router = express.Router();

router.use(express.json());

router.get("/branchSales", bearer, acl("read"), (req, res) => {
  res.send("You have access to read this data");
});

router.post("/branchSales", bearer, acl("create"), (req, res) => {
  res.send("You have access to update this data");
});

router.delete("/branchSales", bearer, acl("delete"), (req, res) => {
  res.send("You have access to delete this data");
});

module.exports = router;
