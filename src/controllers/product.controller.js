"use strict";
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const ProductService = require("../services/product.service");
const ProductServiceABC = require("../services/product.service.abc");

class ProductController {
  createProduct = async (req, res, next) => {
    // new SuccessResponse({
    //   message: "Create New Product Success",
    //   metadata: await ProductService.createProduct(req.body.product_type, {
    //     ...req.body,
    //     product_createdby: req.user.userId,
    //   }),
    // }).send(res);

    new SuccessResponse({
      message: "Create New Product Success",
      metadata: await ProductServiceABC.createProduct(req.body.product_type, {
        ...req.body,
        product_createdby: req.user.userId,
      }),
    }).send(res);
  };

  /**
   * Get All Product Draft For Createdby
   * @param {Number} limit 
   * @param {Number} skip 
   * @return {JSON} res 
   */
  getAllDraftForCreatedBy = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Products Draft Success",
      metadata: await ProductServiceABC.findAllDraftForShop(
        req.body.product_type,
        {
          product_createdby: req.user.userId,
        }
      ),
    }).send(res);
  };
}

module.exports = new ProductController();
