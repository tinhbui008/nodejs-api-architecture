"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../ultils");

const Roles = {
  SuperAdmin: "admin",
  Admin: "admin",
  Customer: "admin",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const existUser = await userModel.findOne({ email }).lean();

      if (existUser) {
        return {
          code: "yyy",
          message: "Account already exists!",
        };
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

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        console.log({ privateKey, publicKey });

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newUser._id,
          publicKey,
          privateKey
        });

        if (!keyStore) {
          return {
            code: "yyy",
            message: "keyStore string error",
          };
        }

        // const publicKeyObj = crypto.createPublicKey(publicKeyString)

        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          publicKey,
          privateKey
        );

        console.log(`tokens is ${tokens}`);

        return {
          code: "201",
          metadata: {
            user: getInfoData({fiels: ['_id', 'name', 'email'], object: newUser}),
            tokens,
          },
        };
      }

      return {
        code: "yyy",
        message: "AHIHI",
      };
    } catch (error) {
      return {
        code: "abcxyz",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
