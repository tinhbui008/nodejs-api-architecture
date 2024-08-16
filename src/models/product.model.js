"use strict";

const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const mongoose = require("mongoose"); // Erase if already required

const DOC_NAME = "Product";
const COLLECT_NAME = "Products";

var productSchema = Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronic", "Clothing", "Furniture", "Toys"],
    },
    product_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    product_slug: {
      type: String,
    },
    product_ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
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
  },
  {
    timestamps: true,
    collection: COLLECT_NAME,
  }
);

productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

// Declare the Schema of the Mongo model
var clothesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    material: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Clothes",
  }
);

var electronicSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    product_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "Electronics",
  }
);

var furnitureSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    product_createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "Furnitures",
  }
);

//Export the model
module.exports = {
  product: model(DOC_NAME, productSchema),
  clothing: model("Clothing", clothesSchema),
  electronic: model("Electronic", electronicSchema),
  furniture: model("Furniture", furnitureSchema),
};
