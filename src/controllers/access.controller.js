"use strict";
const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      // console.log(req.body)
      return res.status(200).json(await AccessService.signUp(req.body));
      // return res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
