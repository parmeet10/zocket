const wrapperService = require("../services/wrapper");

const database = require("../database/sql");

const getStatus = async (params) => {
  if (!params.statusId) {
    throw new Error("input_missing");
  }

  let getStatusQuery = database.knex
    .select("s.id")
    .select("s.status_name as status")
    .select("s.active")
    .select("s.created_at")
    .from("status as s")
    .where("s.active", 1)
    .where("s.id", params.statusId);

  let status = await getStatusQuery;

  return status[0];
};

module.exports = {
  getStatus: wrapperService.wrap(getStatus),
};
