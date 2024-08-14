"use strict";

const exress = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const router = exress.Router();

// //authentication
// router.use(authentication);
router.post("/", asyncHandler(productController.createProduct));

module.exports = router;
