const wrapperService = require("./wrapper");

const status = require("../configs/status");

const productService = require("./products");
const platformService = require("./platforms");

const campaignsModel = require("../models/campaigns");

const createCampaign = async (params) => {
  if (
    !params.campaign ||
    !params.budget ||
    !params.startDate ||
    !params.endDate ||
    !params.productId ||
    !params.platformId ||
    !params.location
  ) {
    throw new Error("input_missing");
  }

  if (params.endDate < new Date() || params.startDate > params.endDate) {
    throw new Error("invalid_date");
  }

  let productParams = {};
  productParams.productId = params.productId;

  let product = await productService.getProducts(productParams);
  if (!product.data.products.length) {
    throw new Error("authn_fail");
  }

  let platformParams = {};
  platformParams.platformId = params.platformId;

  let platform = await platformService.getPlatforms(platformParams);
  if (!platform.data.platforms.length) {
    throw new Error("authn_fail");
  }

  let campaignParams = {};
  campaignParams.campaign = params.campaign;
  campaignParams.budget = params.budget;
  campaignParams.startDate = params.startDate;
  campaignParams.endDate = params.endDate;
  campaignParams.productId = params.productId;
  campaignParams.platformId = params.platformId;
  campaignParams.location = params.location;
  campaignParams.status = "live"; // DANGEROUS ASSUMPTION 

  const campaignId = await campaignsModel.createCampaign(campaignParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.campaignId = campaignId;

  return response;
};
module.exports = {
  createCampaign: wrapperService.wrap(createCampaign),
};
