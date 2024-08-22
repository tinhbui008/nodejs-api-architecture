"use strict";

const {
  product,
  electronic,
  clothing,
  furniture,
} = require("../../models/product.model");

const { Types } = require("mongoose");
const { selectData, unSelectData } = require("../../ultils");
const findAll = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;

  const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };

  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(selectData(select))
    .lean();

  return products;
};

const findById = async ({ product_id, unSelect }) => {
  return product.findById(product_id).select(unSelectData(unSelect)).lean();
};

const findAllDraftForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const findAllPublishedForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const searchProductByCreated = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const results = await product
    .find(
      {
        isPublished: true,
        isDraft: false,
        $text: { $search: regexSearch },
      },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .lean();

  return results;
};

const publishedProductByCreatedByAndProductId = async ({
  product_createdby,
  product_id,
}) => {
  const productExist = await product.findOne({
    product_createdby: new Types.ObjectId(product_createdby),
    _id: product_id,
  });

  console.log(`productExist::::: ${typeof productExist}`);

  if (!productExist) return null;

  productExist.isDraft = false;
  productExist.isPublished = true;

  // const { modifiedCount } = await productExist.update(productExist);

  const { modifiedCount } = await product.updateOne(
    { _id: productExist._id },
    productExist
  );

  return modifiedCount;
};

const unPublishedProductByCreatedByAndProductId = async ({
  product_createdby,
  product_id,
}) => {
  const productExist = await product.findOne({
    product_createdby: new Types.ObjectId(product_createdby),
    _id: product_id,
  });

  if (!productExist) return null;

  productExist.isDraft = true;
  productExist.isPublished = false;

  const { modifiedCount } = await product.updateOne(
    { _id: productExist._id },
    productExist
  );

  return modifiedCount;
};

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate("product_createdby", "name email -_id")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

module.exports = {
  findAllDraftForShop,
  findAllPublishedForShop,
  publishedProductByCreatedByAndProductId,
  unPublishedProductByCreatedByAndProductId,
  searchProductByCreated,
  findAll,
  findById,
};
