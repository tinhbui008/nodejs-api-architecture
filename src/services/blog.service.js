"use strict";
const { blog } = require("../models/blog.model");
const { BadRequestError } = require("../core/error.response");

class BlogFactory {
  static blogRegistry = {};

  static async findAllDraftForCreatedBy({
    blog_createdby,
    limit = 50,
    skip = 0,
  }) {
    // console.log(`Blog findAllDraftForShop::::: ${blog_createdby}`);

    return blog_createdby;
  }

  static async createBlog(payload) {
    console.log(`Blog create::::: ${payload}`);
    return await blog.create({ payload });
  }
}

class Blog {
  constructor({
    blog_name,
    blog_description,
    blog_content,
    blog_type,
    blog_attributes,
    blog_createdby,
  }) {
    this.blog_name = blog_name;
    this.blog_description = blog_description;
    this.blog_content = blog_content;
    this.blog_type = blog_type;
    this.blog_attributes = blog_attributes;
    this.product_type = product_type;
    this.blog_createdby = blog_createdby;
  }

  async createBlog() {
    return await blog.create(this);
  }
}

module.exports = BlogFactory;
