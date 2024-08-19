const { Schema, model } = require("mongoose");

const DOC_NAME = "Blog";
const COLLECT_NAME = "Blogs";

var userSchema = new Schema(
  {
    blog_name: {
      type: String,
      required: true,
      index: true,
    },
    blog_description: {
      type: String,
      required: true,
      index: true,
    },
    blog_content: {
      type: String,
      required: true,
    },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
    blog_type: {
      type: String,
      required: true,
      enum: [""],
      default: ["Sport"],
    },
    blog_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blog_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    blog_thumb: {
      type: String,
      required: true,
    },
    blog_gallery: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECT_NAME,
  }
);

module.exports = model(DOC_NAME, userSchema);
