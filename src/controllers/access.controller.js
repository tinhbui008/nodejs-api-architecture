"use strict";
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }


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
