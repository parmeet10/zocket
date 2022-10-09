const wrapperService = require("../services/wrapper");

const database = require("../database/sql");

const createPlatform = async (params) => {
  if (!params.platform) {
    throw new Error("input_missing");
  }

  let _insert = {
    platform: params.platform,
  };

  let createPlatformQuery = database.knex.insert(_insert).into("platforms");

  let platformId = await createPlatformQuery;

  return platformId[0];
};

const getPlatforms = async (params) => {
  let getPlatformsQuery = database.knex
    .select("pf.id")
    .select("pf.platform")
    .select("pf.active")
    .select("pf.created_at")
    .from("platforms as pf")
    .where("pf.active", 1);

  params.platformId
    ? getPlatformsQuery.where("pf.id", params.platformId)
    : null;

  let platforms = await getPlatformsQuery;

  return platforms;
};

module.exports = {
  getplatforms: wrapperService.wrap(getPlatforms),
  createPlatform: wrapperService.wrap(createPlatform),
};
