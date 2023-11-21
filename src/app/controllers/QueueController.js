const queuemodel = require('../models/Queue');
const printermodel = require('../models/Printer');
const accountmodel = require('../models/Account');
const printordermodel = require('../models/PrintOrder');
const mongoose = require('mongoose');
const {
  generatepassword,
  formatedata,
  generatesignature,
  validatepassword,
  generatesalt,
} = require('../../auth/side');

class QueueController {
  async pushorder(userinputs) {
    const { printer, printOrder } = userinputs;

    try {
      // const myqueue = await queuemodel.find({printer:printer});
      // if (myqueue){
      //     const result = await myqueue.updateOne({},{$push:{printOrders:{$each:[printOrderID]}}});
      //     return formatedata({
      //         message:'Print order pushed to queue',
      //         printer: printer,
      //         printOrderID:printOrderID,
      //         result:result
      //     });
      // }

      // const result = await queuemodel.findOneAndUpdate({printer:printer},{$push:{printOrders:printOrder}});
      const myqueue = await queuemodel.find({ printer: printer });
      const order = await printordermodel.findById(printOrder);
      // console.log(myqueue);
      // console.log(order);

      if (order && myqueue) {
        myqueue[0].printOrders.push(order);
        const result = await myqueue[0].save();

        if (result) {
          return formatedata({
            message: 'Print order pushed to queue',
            printer: printer,
            printOrder: printOrder,
            result: result,
          });
        }
      }

      return formatedata({
        error: {
          message: 'Request failed',
        },
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QueueController();
