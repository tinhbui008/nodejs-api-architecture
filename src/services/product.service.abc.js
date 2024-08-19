"use strict";

const {
  product,
  clothing,
  electronic,
  furniture,
} = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");
const {
  findAllDraftForShop,
  publishedProductByCreatedByAndProductId,
  findAllPublishedForShop,
  unPublishedProductByCreatedByAndProductId,
  searchProductByCreated,
} = require("../models/repositories/product.repo");

class ProductFactory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  //GET
  static async findAllDraftForShop({
    product_createdby,
    limit = 50,
    skip = 0,
  }) {
    const query = { product_createdby, isDraft: true };
    return await findAllDraftForShop({ query, limit, skip });
  }

  static async findAllPublishedForShop({
    product_createdby,
    limit = 50,
    skip = 0,
  }) {
    const query = { product_createdby, isPublished: true };
    return await findAllPublishedForShop({ query, limit, skip });
  }

  static async searchProductByCreated({ keySearch }) {
    return await searchProductByCreated({ keySearch });
  }

  //PUT
  static publishedProductByCreatedBy = async ({
    product_createdby,
    product_id,
  }) => {
    return await publishedProductByCreatedByAndProductId({
      product_createdby,
      product_id,
    });
  };

  static unPublishedProductByCreatedBy = async ({
    product_createdby,
    product_id,
  }) => {
    return await unPublishedProductByCreatedByAndProductId({
      product_createdby,
      product_id,
    });
  };

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];

    if (!productClass)
      throw new BadRequestError(`Invalid product type ${type}`);

    return new productClass(payload).createProduct();

    // switch (type) {
    //   case "Electronic":
    //     console.log(`Electronic create new::: ${type}`);
    //     return new Electronic(payload).createProduct();

    //   case "Clothing":
    //     return new Clothing(payload).createProduct();

    //   default:
    //     throw new BadRequestError(`Invalid product type:::: ${type}`);
    // }
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_createdby,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_createdby = product_createdby;
    this.product_attributes = product_attributes;
  }

  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing) throw new BadRequestError("create new clothing error");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }
}

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_createdby: this.product_createdby,
    });

    if (!newElectronic)
      throw new BadRequestError("create new electronic error");
    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_createdby: this.product_createdby,
    });

    if (!newFurniture) throw new BadRequestError("create new furniture error");
    const newProduct = await super.createProduct(newFurniture._id);

    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }
}

ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Electronic", Electronic);
ProductFactory.registerProductType("Furniture", Furniture);

module.exports = ProductFactory;
