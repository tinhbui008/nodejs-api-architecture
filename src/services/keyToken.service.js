"use strict";
const { Types } = require("mongoose");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId };

      const update = {
        $set: {
          userId,
          publicKey,
          privateKey,
          refreshTokenUsed: [],
          refreshToken,
        },
      };

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return {
        success: true,
        message: error.message,
        status: 400,
      };
    }
  };

  static findByUserId = async ({ userId }) => {
    var id = new Types.ObjectId(userId);
    var user = keytokenModel.findOne(userId);
    console.log(`userrrrrrrr::::: ${user}`);
    return await keytokenModel.findOne({ user: id });
  };
}

module.exports = KeyTokenService;
