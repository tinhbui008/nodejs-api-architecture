"use strict";

const { Schema, model } = require("mongoose");

const DOC_NAME = "ApiKey";
const COLLECT_NAME = "ApiKeys";

var userSchema = Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      default: ["001", "002", "003"],
    },
  },
  {
    timestamps: true,
    collection: COLLECT_NAME,
  }
);

//Export the model
module.exports = model(DOC_NAME, userSchema);
