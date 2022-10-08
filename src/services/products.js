const wrapperService = require("../services/wrapper");

const status = require("../configs/status");

const productsModel = require("../models/products");

const createProduct = async (params) => {
  if (!params.product) {
    throw new Error("input_missing");
  }

  let productsParams = {};
  productsParams.product = params.product;

  productId = await productsModel.createProduct(productsParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.productId = productId;

  return response;
};

const getProducts = async (params) => {
  let productsParams = {};
  params.productId ? (productsParams.productId = params.productId) : null;

  let products = await productsModel.getProducts(productsParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.products = products;

  return response;
};

module.exports = {
  getProducts: wrapperService.wrap(getProducts),
  createProduct: wrapperService.wrap(createProduct),
};
