const express = require("express");
const router = express.Router();

const PrinterController = require("../app/controllers/PrinterController");
router.get("/", PrinterController.getPrinters, PrinterController.getPrinter);
router.get("/getPrinter", PrinterController.getPrinter);
router.post("/addPrinter", PrinterController.addPrinter);
router.post("/statusPrinter", PrinterController.statusPrinter);
module.exports = router;
