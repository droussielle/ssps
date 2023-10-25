const SPSO = require("../models/SPSO");

class SPSOController {
  async getSPSO(req, res) {
    res.json("Hello, world!");
  }
}

module.exports = new SPSOController();
