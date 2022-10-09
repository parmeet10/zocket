const express = require("express");
const router = express.Router();

const controller = require("../controllers/campaigns");


router.post("/", controller.createCampaign);
router.get("/", controller.getCampaigns);
router.put("/", controller.updateCampaign);

module.exports = router;
