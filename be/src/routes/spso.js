const express = require("express");
const router = express.Router();

const SPSOController = require("../app/controllers/SPSOController");
router.get("/", SPSOController.getSPSO);
module.exports = router;
