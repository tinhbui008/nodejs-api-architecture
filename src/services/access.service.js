"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../ultils");
const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");
const { findByEmail } = require("./account.service");

const Roles = {
  SuperAdmin: "admin",
  Admin: "admin",
  Customer: "admin",
};

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const accountExist = await findByEmail({ email });
    if (!accountExist) throw new BadRequestError("account does not exist");

    const match = await bcrypt.compare(password, accountExist.password);

    if (!match) throw new AuthFailureError("Authen error");

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: accountExist._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: accountExist._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken
    });

    return {
      user: getInfoData({
        fiels: ["_id", "name", "email"],
        object: accountExist,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const existUser = await userModel.findOne({ email }).lean();

    if (existUser) {
      throw new BadRequestError("Error: Account already exists");
    }

    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: passwordhash,
      roles: [Roles.SuperAdmin],
    });

    if (newUser) {
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem'
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem'
      //   }
      // });

      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      console.log({ privateKey, publicKey });

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) throw new BadRequestError("Error: KeyStore string error");

      // const publicKeyObj = crypto.createPublicKey(publicKeyString)

      const tokens = await createTokenPair(
        { userId: newUser._id, email },
        publicKey,
        privateKey
      );

      return {
        code: "201",
        metadata: {
          user: getInfoData({
            fiels: ["_id", "name", "email"],
            object: newUser,
          }),
          tokens,
        },
      };
    }

    return {
      code: "yyy",
      message: "AHIHI",
    };
  };
}

module.exports = AccessService;
