"use strict";

const { blog } = require("../../models/blog.model");
const { Types } = require("mongoose");

const createBlog = async ({ query, limit, skip }) => {
  console.log("findAllDraftForCreatedBy");
};

const findAllBlogDraftByCreatedBy = async ({ query, limit, skip }) => {
  return await queryBlog({ query, limit, skip });
};

const publishBlog = async ({ blog_createdby, blog_id }) => {
  const blogExist = await blog.findOne({
    blog_createdby: new Types.ObjectId(blog_createdby),
    _id: blog_id,
  });

  if (!blogExist) return null;

  blogExist.isDraft = false;
  blogExist.isPublished = true;

  const { modifiedCount } = await blog.updateOne(
    { _id: blogExist._id },
    blogExist
  );

  return modifiedCount;
};

const unPublishBlog = async ({ blog_createdby, blog_id }) => {
  const blogExist = await blog.findOne({
    blog_createdby: new Types.ObjectId(blog_createdby),
    _id: blog_id,
  });

  if (!blogExist) return null;

  blogExist.isDraft = true;
  blogExist.isPublished = false;

  const { modifiedCount } = await blog.updateOne(
    { _id: blogExist._id },
    blogExist
  );

  return modifiedCount;
};

const queryBlog = async ({ query, limit, skip }) => {
  return await blog
    .find(query)
    .populate("blog_createdby", "name email -_id")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

module.exports = {
  findAllBlogDraftByCreatedBy,
  createBlog,
  publishBlog,
  unPublishBlog,
};
