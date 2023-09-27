const express = require("express");
const router = express.Router();

const PrintingOrderDetailController = require("../app/controllers/PrintingOrderDetailController");
router.get("/", PrintingOrderDetailController.getPrintingOrderDetail);
module.exports = router;
