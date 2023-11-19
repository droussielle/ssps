const accountmodel = require('../models/Account');
const spsomodel = require('../models/SPSO');
const printermodel = require('../models/Printer');
const printordermodel = require('../models/PrintOrder');
const mongoose = require('mongoose');
const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');

class PrintOrderController {
  async createprintorder(userinputs) {
    const {
      user,
      printer,
      note,
      fileName,
      printProperties,
      beginTime,
      estimatedEndTime,
      status,
    } = userinputs;
    try {
      const _id = new mongoose.Types.ObjectId();
      const newOrder = new printordermodel({
        _id: _id,
        user: user,
        printer: printer,
        note: note,
        fileName: fileName,
        printProperties: printProperties,
        beginTime: beginTime,
        estimatedEndTime: estimatedEndTime,
        status: status,
        fileLocation: '/upload' + _id,
      });
      const result = await newOrder.save();

      return formatedata(result);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PrintOrderController();
