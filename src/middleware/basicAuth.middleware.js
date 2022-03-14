"use strict";

const base64 = require("base-64");
const { User } = require("../models/index.model");

 function signin(req, res, next) {  
  if (req.headers.authorization) {
    let arr = req.headers.authorization.split(" ");
    let usernameandpass = arr.pop();
    let decoded = base64.decode(usernameandpass);
    let [username, password] = decoded.split(":");
  

    User.authenticateBasic(username, password).then(validUser => {
      req.user = validUser;
      next();
    }).catch(error=>next(`invalid user ${error}`));

    
  } 
}

module.exports = signin;