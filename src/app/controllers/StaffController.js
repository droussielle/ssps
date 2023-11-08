const Staff = require("../models/Staff");

class StaffController {
  async getStaff(req, res) {
    res.json("Hello, world!");
  }
}

module.exports = new StaffController();
