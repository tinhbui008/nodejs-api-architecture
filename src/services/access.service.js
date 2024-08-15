"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../ultils");
const {
  BadRequestError,
  ConflictRequestError,
  ForbiddenError,
  AuthFailureError,
} = require("../core/error.response");
const { findByEmail } = require("./account.service");

const Roles = {
  SuperAdmin: "superadmin",
  Admin: "admin",
  Customer: "customer",
};

class AccessService {
  static handlerRefreshTokenV2 = async ({ keyStore, user, refreshToken }) => {
    const { userId, email } = user;
    console.log(`handlerRefreshTokenV2 email::: ${user.email}`);
    console.log(`handlerRefreshTokenV2 userId::: ${user.userId}`);



    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError(
        "Something went wrong!!! Please try login again"
      );
    }

    if (keyStore.refreshToken !== refreshToken)
      throw new AuthFailureError("User 1 not registered");

    const foundUser = await findByEmail({email: email});
    if (!foundUser) throw new AuthFailureError("User 2 not registered");

    const tokens = await createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    await KeyTokenService.updateOne(keyStore);

    return {
      user,
      tokens,
    };
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const accountExist = await findByEmail({ email });
    if (!accountExist) throw new BadRequestError("account does not exist");

    const match = await bcrypt.compare(password, accountExist.password);

    if (!match) throw new AuthFailureError("Authen error");

    const privateKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = accountExist;
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: accountExist._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        fiels: ["_id", "name", "email"],
        object: accountExist,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password, roles }) => {
    const existUser = await userModel.findOne({ email }).lean();

    if (existUser) {
      throw new BadRequestError("Error: Accounttttttt already exists");
    }

    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: passwordhash,
      // roles: [Roles.SuperAdmin],
      roles: roles,
    });

    if (newUser) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      console.log({ privateKey, publicKey });

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) throw new BadRequestError("Error: KeyStore string error");

      const tokens = await createTokenPair(
        { userId: newUser._id, email },
        publicKey,
        privateKey
      );

      return {
        code: "201",
        metadata: {
          user: getInfoData({
            fiels: ["_id", "name", "email", "roles"],
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

  static logout = async ({ keyStore }) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };

  static handlerRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    console.log(`foundToken:::::::::::: ${foundToken}`);
    if (foundToken) {
      const { userId, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );

      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError(
        "Something went wrong!!! Please try login again"
      );
    }

    const holdTokenKey = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holdTokenKey) throw new AuthFailureError("User 1 not registered");

    const { userId, email } = await verifyJWT(
      refreshToken,
      holdTokenKey.privateKey
    );

    const foundUser = await findByEmail(email);
    if (foundUser) throw new AuthFailureError("User 2 not registered");

    const tokens = await createTokenPair(
      { userId, email },
      holdTokenKey.publicKey,
      holdTokenKey.privateKey
    );

    //update token
    await KeyTokenService.updateOne(holdTokenKey);

    return {
      user: { userId, email },
      tokens,
    };
  };
}

module.exports = AccessService;
