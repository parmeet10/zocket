const wrapperService = require("../services/wrapper");

const productService = require("../services/products");

const createProduct = async (req, res, next) => {
  if (!req.body.product) {
    throw new Error("input_missing");
  }

  let productsParams = {};
  productsParams.product = req.body.product;

  let result = await productService.createProduct(productsParams);

  return res.json(result);
};

const getProducts = async (req, res, next) => {
  let productsParams = {};
  req.query.productId ? (productsParams.productId = req.query.productId) : null;

  let result = await productService.getProducts(productsParams);

  return res.json(result);
};

module.exports = {
  getProducts: wrapperService.wrap(getProducts),
  createProduct: wrapperService.wrap(createProduct),
};
