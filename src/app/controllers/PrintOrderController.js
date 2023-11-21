const accountmodel = require('../models/Account');
const spsomodel = require('../models/SPSO');
const printermodel = require('../models/Printer');
const printordermodel = require('../models/PrintOrder');
const queuemodel = require('../models/Queue');
const multer = require('multer');
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
    // console.log(fileType[1]);
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
      });
      const result = await newOrder.save();

      return formatedata({
        message: 'New order created: ',
        // orderID: _id.toString(),
        orderID: _id,
        result: result,
      });
    } catch (err) {
      throw err;
    }
  }

  async uploader(_id) {
    try {
      const printorder = await printordermodel.findById(_id);
      const fileType = printorder.fileName.split('.');

      if (printorder === null) {
        return formatedata({
          error: {
            message: 'Print order not found',
          },
        });
      }

      const result = await printordermodel.findByIdAndUpdate(
        { _id: _id },
        {
          $set: {
            fileLocation: '/uploads/' + _id + '.' + fileType[1],
          },
        },
      );

      return formatedata({
        message: 'Upload complete',
        result: result,
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PrintOrderController();
