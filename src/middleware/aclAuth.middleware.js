"use strict";
const { User } = require("../models/index.model");
function acl(action) {
  return async (req, res, next) => {
    try {
      if (req.user == undefined) {
        req.user = await User.findOne({
          where: { username: req.params.username },
        });
        console.log(req.user);
      }
      if (req.user.actions.includes(action)) {
        console.log("inside the if statement");
        next();
      } else {
        next("access denied");
      }
    } catch (e) {
      next("something went wrong");
    }
  };
}

module.exports = acl;
