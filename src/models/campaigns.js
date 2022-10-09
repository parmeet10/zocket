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

const getCampaigns = async (params) => {
  let getCampaignsQuery = database.knex
    .select("c.id")
    .select("c.campaign as campaign_name")
    .select("c.budget")
    .select("c.status")
    .select("c.start as startDate")
    .select("c.end as endDate")
    .select("c.created_at")
    .select("c.location")
    .select("c.active")
    .select("pf.platform")
    .select("p.product")
    .from("campaigns as c")
    .innerJoin("platforms as pf", { "pf.id": "c.platform_id" })
    .innerJoin("products as p", { "p.id": "c.product_id" });

  params.campaignId ? getCampaignsQuery.where("c.id", params.campaignId) : null;
  params.platformId
    ? getCampaignsQuery.where("pf.id", params.platformId)
    : null;
  params.status ? getCampaignsQuery.where("c.status", params.status) : null;
  params.from ? getCampaignsQuery.where("c.start", ">", params.from) : null;
  params.to ? getCampaignsQuery.where("c.end", "<", params.to) : null;

  let campaigns = await getCampaignsQuery;

  return _translateToJson(campaigns);
};

const updateCampaign = async (params) => {
  if (!params.campaignId) {
    throw new Error("input_missing");
  }

  let _update = { updated_at: new Date() };
  params.status ? (_update["status"] = params.status) : null;
  params.hasOwnProperty("active") ? (_update["active"] = params.active) : null;

  let updateCampaignQuery = database
    .knex("campaigns")
    .update(_update)
    .where("id", params.campaignId);

  let result = await updateCampaignQuery;

  return true;
};

const _translateToJson = (campaigns) => {
  let campaignIds = Array.from(
    new Set(campaigns.map((campaign) => campaign.id))
  );

  let result = [];

  campaignIds.forEach((campaignId) => {
    let _campaigns = campaigns.filter((campaign) => campaign.id === campaignId);
    let _campaign = _campaigns[0];

    let _result = {};
    _result.id = _campaign.id;
    _result.campaign_name = _campaign.campaign_name;
    _result.budget = _campaign.budget;
    _result.status = _campaign.status;
    _result.startDate = _campaign.startDate;
    _result.endDate = _campaign.endDate;
    _result.location = _campaign.location;
    _result.plaform = _campaign.platform;
    _result.product = _campaign.product;
    _result.active = _campaign.active;
    _result.created_at = _campaign.created_at;

    result.push(_result);
  });

  return result;
};

module.exports = {
  createCampaign: wrapperService.wrap(createCampaign),
  getCampaigns: wrapperService.wrap(getCampaigns),
  updateCampaign: wrapperService.wrap(updateCampaign),
};
