"use strict";
const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFailureError, NotfoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
};

const createTokenPair = async (payload, publickey, privateKey) => {
  try {
    //access token
    const accessToken = await JWT.sign(payload, publickey, {
      // algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publickey, (err, decode) => {
      if (err) {
        console.log("err:::", err);
      } else {
        console.log("verify:::", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];

  //1
  if (!userId) throw new AuthFailureError("Invalid Request");

  //2
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotfoundError("Notfound keystore");

  //3
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new NotfoundError("Invalid keystore");

  //4
  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId != decodeUser.userId) throw new AuthFailureError("Invalid user");
    req.keyStore = keyStore;

    return next();
  } catch (error) {
    throw error;
  }
});

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT
};
