"use strict";

const exress = require("express");
const blogController = require("../../controllers/blog.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication, authenticationV2 } = require("../../auth/authUtils");
const router = exress.Router();
// //authentication
router.use(authenticationV2);
router.post("/", asyncHandler(blogController.createBlog));
router.get(
  "/getallblogsbycreatedby",
  asyncHandler(blogController.getAllBlogsByCreatedBy)
);
router.post("/publish/:id", asyncHandler(blogController.publishBlog));
router.post("/unpublish/:id", asyncHandler(blogController.unPublishBlog));

module.exports = router;
