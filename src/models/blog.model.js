const { Schema, model } = require("mongoose");

const DOC_NAME = "Blog";
const COLLECT_NAME = "Blogs";

var blogSchema = new Schema(
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
    blog_slug: {
      type: String,
    },
    blog_gallery: {
      type: Array,
      default: [],
    },
    blog_type: {
      type: String,
      required: true,
      enum: ["Sport", "Health", "Tech"],
    },
  },
  {
    timestamps: true,
    collection: COLLECT_NAME,
  }
);

blogSchema.index({
  blog_name: "text",
  blog_description: "text",
});

blogSchema.pre("save", function (next) {
  this.blog_slug = slugify(this.blog_name, { lower: true });
  next();
});

var sportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    blog_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "Sport",
  }
);

var healthSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    blog_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "Sport",
  }
);

var techSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    blog_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "Sport",
  }
);

module.exports = {
  blog: model(DOC_NAME, blogSchema),
  sport: model("Sport", sportSchema),
  health: model("Health", healthSchema),
  tech: model("Tech", techSchema),
};
