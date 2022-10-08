const statusService = require("../services/status");

const wrapperService = require("../services/wrapper");

const getStatus = async (req, res, next) => {
  let statusParams = {};
  req.query.statusId ? (statusParams.statusId = req.query.statusId) : null;

  let result = await statusService.getStatus(statusParams);

  res.json(result);
};

module.exports = {
  getStatus: wrapperService.wrap(getStatus),
};
