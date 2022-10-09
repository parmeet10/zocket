const wrapperService = require("../services/wrapper");

const status = require("../configs/status");

const platformsModel = require("../models/platforms");

const createPlatform = async (params) => {
  if (!params.platform) {
    throw new Error("input_missing");
  }

  let platformsParams = {};
  platformsParams.platform = params.platform;

  platformId = await platformsModel.createPlatform(platformsParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.platfromId = platformId;

  return response;
};

const getPlatforms = async (params) => {
  let platformsParams = {};
  params.platformId ? (platformsParams.platformId = params.platformId) : null;

  let platforms = await platformsModel.getplatforms(platformsParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.platforms = platforms;

  return response;
};

module.exports = {
  getPlatforms: wrapperService.wrap(getPlatforms),
  createPlatform: wrapperService.wrap(createPlatform),
};
