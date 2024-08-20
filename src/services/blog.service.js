"use strict";
const { blog, sport, health, tech } = require("../models/blog.model");
const { BadRequestError } = require("../core/error.response");

class BlogFactory {
  static blogRegistry = {};

  static registerBlogType(type, classRef) {
    console.log(`registerBlogType::::${type} ----- ${classRef}`);
    BlogFactory.blogRegistry[type] = classRef;
  }

  static async findAllDraftForCreatedBy({
    blog_createdby,
    limit = 50,
    skip = 0,
  }) {
    return blog_createdby;
  }

  static async createBlog(type, payload) {
    const blogClass = BlogFactory.registerBlogType[type];
    console.log(`createBlog:::: ${type}`);
    if (!blogClass) throw new BadRequestError(`Invalid blog type ${type}`);

    return new blogClass(payload).createBlog();

    // console.log(`start create blog`);
    // console.log(payload);
    // return new Blog(payload).createBlog();
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
    blog_thumb,
  }) {
    this.blog_name = blog_name;
    this.blog_description = blog_description;
    this.blog_content = blog_content;
    this.blog_type = blog_type;
    this.blog_attributes = blog_attributes;
    this.blog_createdby = blog_createdby;
    this.blog_thumb = blog_thumb;
  }

  async createBlog(blog_id) {
    return await blog.create({ ...this, _id: blog_id });
  }
}

class Sport extends Blog {
  async createBlog() {
    const newSport = await sport.create(this.blog_attributes);
    if (!newSport) throw new BadRequestError("create new clothing error");
    const newBlog = await super.createBlog();
    if (!newBlog) throw new BadRequestError("create new product error");
    console.log(`newBlog:::::: ${newBlog}`);
    return newBlog;
  }
}

BlogFactory.registerBlogType("Sport", Sport);
module.exports = BlogFactory;
