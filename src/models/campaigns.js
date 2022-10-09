const wrapperService = require("../services/wrapper");

const database = require("../database/sql");

const createCampaign = async (params) => {
  if (
    !params.campaign ||
    !params.budget ||
    !params.startDate ||
    !params.endDate ||
    !params.productId ||
    !params.platformId ||
    !params.location ||
    !params.status
  ) {
    throw new Error("input_missing");
  }

  let _insert = {
    campaign: params.campaign,
    budget: params.budget,
    start: params.startDate,
    end: params.endDate,
    product_id: params.productId,
    platform_id: params.platformId,
    location: params.location,
    status: params.status,
  };

  let createCampaignQuery = database.knex.insert(_insert).into("campaigns");

  let campaignId = await createCampaignQuery;

  return campaignId[0];
};

module.exports = {
  createCampaign: wrapperService.wrap(createCampaign),
};
