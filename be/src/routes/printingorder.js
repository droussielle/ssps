const express = require("express");
const router = express.Router();

const PrintingOrderController = require("../app/controllers/PrintingOrderController");
router.get("/", PrintingOrderController.getPrintingOrder);
module.exports = router;
