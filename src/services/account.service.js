"use strict";
const userModel = require("../models/user.model");

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 1,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  return await userModel.findOne({ email }).lean();
};

module.exports = { findByEmail };
