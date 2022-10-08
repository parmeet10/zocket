const wrapperService = require("../services/wrapper");

const statusConstants = require("../configs/status");

const statusModel = require("../models/status");

const getStatus = async (params) => {
  if (!params.statusId) {
    throw new Error("input_missing");
  }

  let statusParams = {};
  statusParams.statusId = params.statusId;

  let status = await statusModel.getStatus(statusParams);

  let response = statusConstants.getStatus("success");
  response.data = {};
  response.data.status = status;

  return response;
};

module.exports = {
  getStatus: wrapperService.wrap(getStatus),
};
