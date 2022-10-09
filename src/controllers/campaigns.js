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

module.exports = {
  createCampaign: wrapperService.wrap(createCampaign),
};
