const express = require("express");
const router = express.Router();

const controller = require("../controllers/platforms");

router.post("/", controller.createPlatform);
router.get("/", controller.getPlatforms);

module.exports = router;
