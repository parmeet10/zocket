const wrapperService = require("../services/wrapper");

const campaignService = require("../services/campaigns");

const createCampaign = async (req, res, next) => {
  if (
    !req.body.campaign ||
    !req.body.budget ||
    !req.body.startDate ||
    !req.body.endDate ||
    !req.body.productId ||
    !req.body.platformId ||
    !req.body.location
  ) {
    throw new Error("input_missing");
  }

  let createCampaignParams = {};
  createCampaignParams.campaign = req.body.campaign;
  createCampaignParams.location = req.body.location.toLowerCase();
  createCampaignParams.budget = parseInt(req.body.budget);
  createCampaignParams.startDate = new Date(req.body.startDate);
  createCampaignParams.endDate = new Date(req.body.endDate);
  createCampaignParams.productId = parseInt(req.body.productId);
  createCampaignParams.platformId = parseInt(req.body.platformId);

  let result = await campaignService.createCampaign(createCampaignParams);

  return res.json(result);
};

const getCampaigns = async (req, res, next) => {
  let campaignParams = {};
  req.query.campaignId
    ? (campaignParams.campaignId = req.query.campaignId)
    : null;
  req.query.platformId
    ? (campaignParams.platformId = req.query.platformId)
    : null;
  req.query.status
    ? (campaignParams.status = req.query.status.toLowerCase())
    : null;
  req.query.from
    ? (campaignParams.from = new Date(req.query.from).toISOString())
    : null;
  req.query.to
    ? (campaignParams.to = new Date(req.query.to).toISOString())
    : null;

  let result = await campaignService.getCampaigns(campaignParams);

  return res.json(result);
};

const updateCampaign = async (req, res, next) => {
  if (!req.query.campaignId) {
    throw new Error("input_missing");
  }

  let campaignParams = {};
  campaignParams.campaignId = req.query.campaignId;
  req.body.hasOwnProperty("active")
    ? (campaignParams.active = req.body.active)
    : null;

  let result = await campaignService.updateCampaign(campaignParams);

  return res.json(result);
};

module.exports = {
  createCampaign: wrapperService.wrap(createCampaign),
  getCampaigns: wrapperService.wrap(getCampaigns),
  updateCampaign: wrapperService.wrap(updateCampaign),
};
