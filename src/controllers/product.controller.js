"use strict";
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const ProductService = require("../services/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    console.log("product controller req.body.userId::::", req.user.userId);
    new SuccessResponse({
      message: "Create New Product Success",
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_createdby: req.user.userId,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
