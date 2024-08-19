"use strict";

const BlogService = require("../services/blog.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");

class BlogController {
  /**
   * Get All Product Draft For CreatedBy
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON} res
   */
  getAllDraftForCreatedBy = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Blogs Draft Success",
      metadata: await BlogService.findAllDraftForCreatedBy({
        blog_createdby: req.user.userId,
      }),
    }).send(res);
  };

  createBlog = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Blogs Draft Success",
      metadata: await BlogService.createBlog(req.body),
    }).send(res);
  };
}

module.exports = new BlogController();
