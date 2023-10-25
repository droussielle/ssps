const express = require("express");
const router = express.Router();

const StaffController = require("../app/controllers/StaffController");
router.get("/", StaffController.getStaff);
module.exports = router;
