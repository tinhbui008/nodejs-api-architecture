"use strict";

const BlogService = require("../services/blog.service");
const { CREATED, OK, SuccessResponse } = require("../core/success.response");

class BlogController {
  getAllBlogsByCreatedBy = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Blogs Draft Success",
      metadata: await BlogService.findAllDraftForCreatedBy({
        blog_createdby: req.user.userId,
      }),
    }).send(res);
  };

  createBlog = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Blog Success",
      metadata: await BlogService.createBlog(req.body.blog_type, {
        ...req.body,
        blog_createdby: req.user.userId,
      }),
    }).send(res);
  };

  publishBlog = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish blog success",
      metadata: await BlogService.publishBlog({
        blog_createdby: req.user.userId,
        blog_id: req.params.id,
      }),
    }).send(res);
  };

  unPublishBlog = async (req, res, next) => {
    new SuccessResponse({
      message: "Unpublish blog success",
      metadata: await BlogService.unPublishBlog({
        blog_createdby: req.user.userId,
        blog_id: req.params.id,
      }),
    }).send(res);
  };
}

module.exports = new BlogController();
