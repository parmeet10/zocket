const wrapperService = require("../services/wrapper");

const platformService = require("../services/platforms");

const createPlatform = async (req, res, next) => {
  if (!req.body.platform) {
    throw new Error("input_missing");
  }

  let platformsParams = {};
  platformsParams.platform = req.body.platform;

  let result = await platformService.createPlatform(platformsParams);

  return res.json(result);
};

const getPlatforms = async (req, res, next) => {
  let platformsParams = {};

  req.query.platformId
    ? (platformsParams.platformId = parseInt(req.query.platformId))
    : null;

  let result = await platformService.getPlatforms(platformsParams);

  return res.json(result);
};

module.exports = {
  getPlatforms: wrapperService.wrap(getPlatforms),
  createPlatform: wrapperService.wrap(createPlatform),
};
