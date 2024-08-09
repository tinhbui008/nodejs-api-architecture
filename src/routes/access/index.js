"use strict";

const exress = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const router = exress.Router();

router.post("/account/signup", asyncHandler(accessController.signUp));
router.post("/account/login", asyncHandler(accessController.login));

//authentication
router.use(authentication);
router.post("/account/logout", asyncHandler(accessController.logout));
router.post("/account/refreshtoken", asyncHandler(accessController.handlerRefreshToken));

module.exports = router;