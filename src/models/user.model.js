// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const DOC_NAME = "User";
const COLLECT_NAME = "Users";

var userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECT_NAME,
  }
);

//Export the model
module.exports = model(DOC_NAME, userSchema);
