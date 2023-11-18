const printermodel = require('../models/Printer');
var mongoose = require('mongoose');
class PrinterController {
  async createprintorder(userinputs) {
    const {
      user,
      printer,
      beginTime,
      estimatedEndTime,
      note,
      status,
      fileLocation,
      fileName,
      printProperties,
    } = userinputs;
    try {
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PrinterController();
