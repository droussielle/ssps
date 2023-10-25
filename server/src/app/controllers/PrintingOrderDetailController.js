const PrintingOrderDetail = require("../models/PrintingOrderDetail");

class PrintingOrderDetailController {
  async getPrintingOrderDetail(req, res) {
    res.json("Hello, world!");
  }
}

module.exports = new PrintingOrderDetailController();
