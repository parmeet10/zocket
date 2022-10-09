const wrapperService = require("../services/wrapper");

const database = require("../database/sql");

const createProduct = async (params) => {
  if (!params.product) {
    throw new Error("input_missing");
  }

  let _insert = {
    product: params.product,
  };

  let createProductQuery = database.knex.insert(_insert).into("products");

  let productId = await createProductQuery;

  return productId[0];
};

const getProducts = async (params) => {
  let getProductsQuery = database.knex
    .select("p.id")
    .select("p.product")
    .select("p.active")
    .select("p.created_at")
    .from("products as p")
    .where("p.active", 1);

  params.productId ? getProductsQuery.where("p.id", params.productId) : null;

  let products = await getProductsQuery;

  return products;
};

module.exports = {
  getProducts: wrapperService.wrap(getProducts),
  createProduct: wrapperService.wrap(createProduct),
};
