"use strict";
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      console.log(`begin tokenssssssssssssssssssss::: ${tokens}`);

      const filter = { user: userId };
      
      const update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };

      const options = { upsert: true, new: true };

      const tokens = await keytokenModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return {
        success: true,
        message: error.message,
        status: 400,
      };
    }
  };
}

module.exports = KeyTokenService;
