"use strict";
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  logout = async (req, res, next) => {
    console.log(`req.keyStore:::::::::: ${req.keyStore}`);

    return res.status(200).json({ message: "Access" });

    // new SuccessResponse({
    //   message: "Logout Success",
    //   metadata: await AccessService.logout(req.keyStore),
    // }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    try {
      // return res.status(200).json(await AccessService.signUp(req.body));

      new CREATED({
        message: "Registered successfully",
        metadata: await AccessService.signUp(req.body),
        options: {
          limit: 10,
        },
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
