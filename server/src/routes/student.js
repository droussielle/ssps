const express = require("express");
const router = express.Router();

const StudentController = require("../app/controllers/StudentController");
router.get("/", StudentController.getStudent);
module.exports = router;
