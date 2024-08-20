"use strict";

const exress = require("express");
const blogController = require("../../controllers/blog.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication, authenticationV2 } = require("../../auth/authUtils");
const router = exress.Router();

// //authentication
router.use(authentication);

//GET
router.get(
  "/getalldraftforcreatedby",
  asyncHandler(blogController.getAllDraftForCreatedBy)
);

router.post(
  "/",
  asyncHandler(blogController.createBlog)
);

module.exports = router;
