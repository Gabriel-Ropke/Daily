const express = require("express");
const MissionController = require("../controllers/missionController");
const router = express.Router()

router.get("/missions", MissionController.userMissions)

module.exports = router;