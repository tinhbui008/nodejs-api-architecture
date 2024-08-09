"use strict";

const { Schema, model } = require("mongoose"); 

const DOC_NAME = "Key";
const COLLECT_NAME = "Keys";

var keyTokenSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    publicKey: {
      type: String,
      required: true
    },
    privateKey: {
      type: String,
      required: true
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    collection: COLLECT_NAME,
  }
);

module.exports = model(DOC_NAME, keyTokenSchema);
