const PrintingOrder = require("../models/PrintingOrder");

class PrintingOrderController {
  async getPrintingOrder(req, res) {
    res.json("Hello, world!");
  }
}

module.exports = new PrintingOrderController();
