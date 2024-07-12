"use strict";

const exress = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const router = exress.Router();

router.post("/account/signup", asyncHandler(accessController.signUp));
router.post("/account/login", asyncHandler(accessController.login));

module.exports = router;
