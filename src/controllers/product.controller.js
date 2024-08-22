"use strict";
const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const ProductService = require("../services/product.service");
const ProductServiceABC = require("../services/product.service.abc");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create New Product Success",
      metadata: await ProductServiceABC.createProduct(req.body.product_type, {
        ...req.body,
        product_createdby: req.user.userId,
      }),
    }).send(res);
  };

  //POST
  publishedProduct = async (req, res, next) => {
    console.log("Published Productttttttt");
    new SuccessResponse({
      message: "Published Product Success",
      metadata: await ProductServiceABC.publishedProductByCreatedBy({
        product_createdby: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  //POST
  unPublishedProduct = async (req, res, next) => {
    console.log("UnPublished Productttttttt");
    new SuccessResponse({
      message: "UnPublished Product Success",
      metadata: await ProductServiceABC.unPublishedProductByCreatedBy({
        product_createdby: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  /**
   * Get All Product Draft For CreatedBy
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON} res
   */
  getAllDraftForCreatedBy = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Products Draft Success",
      // success: "false",
      metadata: await ProductServiceABC.findAllDraftForShop({
        product_createdby: req.user.userId,
      }),
    }).send(res);
  };

  /**
   * Get All Product Published For CreatedBy
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON} res
   */
  getAllPublishedForCreatedBy = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Products Published Success",
      metadata: await ProductServiceABC.findAllPublishedForShop({
        product_createdby: req.user.userId,
      }),
    }).send(res);
  };

  searchProductByCreated = async (req, res, next) => {
    new SuccessResponse({
      message: "Search Products Success",
      metadata: await ProductServiceABC.searchProductByCreated({
        keySearch: req.params.keySearch,
      }),
    }).send(res);
  };

  getAll = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Products Draft Success",
      metadata: await ProductServiceABC.findAll(req.query),
    }).send(res);
  };

  getById = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Products Draft Success",
      metadata: await ProductServiceABC.findById({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
