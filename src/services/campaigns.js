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

const getCampaigns = async (params) => {
  campaignParams = {};
  params.campaignId ? (campaignParams.campaignId = params.campaignId) : null;
  params.platformId ? (campaignParams.platformId = params.platformId) : null;
  params.from
    ? (campaignParams.from = new Date(params.from).toISOString())
    : null;
  params.to ? (campaignParams.to = new Date(params.to).toISOString()) : null;

  if (params.status) {
    if (params.status !== "live" && params.status !== "exhausted") {
      throw new Error("authn_fail");
    }
    campaignParams.status = params.status;
  }

  let campaigns = await campaignsModel.getCampaigns(campaignParams);

  for (let key of campaigns) {
    if (key.endDate < new Date() && key.status == "live") {
      key.status = "exhausted";

      let updateCampaignParams = {};
      updateCampaignParams.campaignId = key.id;
      updateCampaignParams.status = "exhausted";

      updateCampaign(updateCampaignParams);
    }
  }

  let response = status.getStatus("success");
  response.data = {};
  response.data.campaigns = campaigns;

  return response;
};

const updateCampaign = async (params) => {
  if (!params.campaignId) {
    throw new Error("input_missing");
  }

  let updateCampaignParams = {};
  updateCampaignParams.campaignId = params.campaignId;

  params.status ? (updateCampaignParams.status = params.status) : null;
  params.hasOwnProperty("active")
    ? (updateCampaignParams.active = params.active)
    : null;

  await campaignsModel.updateCampaign(updateCampaignParams);

  let updatedCampaign = await getCampaigns(updateCampaignParams);

  if (!updatedCampaign.data.campaigns.length) {
    throw new Error("authn_fail");
  }

  let response = status.getStatus("success");
  response.data = {};
  response.data.updatedCampaign = updatedCampaign.data.campaigns;

  return response;
};
module.exports = {
  createCampaign: wrapperService.wrap(createCampaign),
  getCampaigns: wrapperService.wrap(getCampaigns),
  updateCampaign: wrapperService.wrap(updateCampaign),
};
