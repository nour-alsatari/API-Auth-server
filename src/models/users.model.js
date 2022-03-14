"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const UsersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "writer", "user"),
      defaultValue: "user",
    },
    token: {
      type: DataTypes.VIRTUAL,
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read"],
          writer: ["read", "create"],
          admin: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
  });
  Users.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      let newToken = jwt.sign({ username: user.username }, SECRET);
      user.token = newToken;
      return user;
    } else {
      throw new Error("Invalid User");
    }
  };

  Users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    const user = await this.findOne({
      where: { username: parsedToken.username },
    });
    if (user) {
      return user;
    } else {
      throw new Error("Invalid Token");
    }
  };
  return Users;
};

module.exports = UsersModel;
