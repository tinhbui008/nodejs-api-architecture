"use strict";

const exress = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication, authenticationV2 } = require("../../auth/authUtils");
const router = exress.Router();

router.get(
  "/search/:keySearch",
  asyncHandler(productController.searchProductByCreated)
);

// //authentication
router.use(authentication);
router.post("/", asyncHandler(productController.createProduct));
router.post("/publish/:id", asyncHandler(productController.publishedProduct));
router.post(
  "/unpublish/:id",
  asyncHandler(productController.unPublishedProduct)
);

//GET
router.get(
  "/getalldraftforcreatedby",
  asyncHandler(productController.getAllDraftForCreatedBy)
);

router.get(
  "/getallpublishedforcreatedby",
  asyncHandler(productController.getAllPublishedForCreatedBy)
);

//PUT
module.exports = router;
