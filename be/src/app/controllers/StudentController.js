const Student = require("../models/Student");

class StudentController {
  async getStudent(req, res) {
    res.json("Hello, world!");
  }
}

module.exports = new StudentController();
