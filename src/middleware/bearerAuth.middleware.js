const { User } = require("../models/index.model");

function bearerAuth(req, res, next) {
  if (req.headers.authorization) {
    let arr = req.headers.authorization.split(" ");
    let token = arr.pop();

    User.authenticateBearer(token).then((user) => {
      req.user = user;
      next();
    });
  }
}

module.exports = bearerAuth;