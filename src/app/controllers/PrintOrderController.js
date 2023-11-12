const accountmodel = require("../models/Account");
const spsomodel = require("../models/SPSO");
const printermodel = require("../models/Printer");
const mongoose = require("mongoose");
const {  generatepassword, formatedata, generatesignature, validatepassword,generatesalt } = require('../../auth/side');

class PrintOrderController {

}

module.exports = new PrintOrderController();