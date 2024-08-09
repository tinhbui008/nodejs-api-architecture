"use strict";
// const { Types } = require("mongoose");
const keytokenModel = require("../models/keytoken.model");
const { ObjectId } = require("mongoose").Types;

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

  static findByUserId = async (userId) => {
    return await keytokenModel.findOne({ user: new ObjectId(userId) }).lean();
  };

  static removeKeyById = async (id) => {
    return await keytokenModel.deleteOne(id);
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    console.log(`findByRefreshTokenUsed:::::::::::: ${refreshToken}`);

    return await keytokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshToken: refreshToken });
  };

  static deleteKeyById = async (userId) => {
    return await keytokenModel.deleteOne({ user: userId });
  };

  static updateOne = async (holdTokenKey) => {
    const filter = { user: holdTokenKey.user };
    const update = {
      $addToSet: { refreshTokensUsed: holdTokenKey.refreshToken },
    };
    return await keytokenModel.updateOne(filter, update);
  };
}

module.exports = KeyTokenService;
