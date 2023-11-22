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
      const myqueue = await queuemodel.find({ printer: printer });
      const order = await printordermodel.findById(printOrder);

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

  async getnext(printer_id) {
    try {
      const queue = await queuemodel.find({ printer: printer_id });
      if (queue) {
        // const result = await printordermodel.findById(queue[0].printOrders[0]);
        const result = await printordermodel.findById(queue[0].printOrders[0]);

        if (result) {
          return formatedata({
            message: 'Order found',
            result: result,
          });
        }

        return formatedata({
          message: 'Queue Empty',
        });
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

  async getall(printer_id) {
    try {
      const queue = await queuemodel.findOne({ printer: printer_id }).populate({
        path: 'printOrders',
      });
      if (queue) {
        const result = await printordermodel.findById(queue.printOrders);

        if (result) {
          return formatedata({
            message: 'Order found',
            queue: queue.printOrders,
          });
        }

        return formatedata({
          message: 'Queue Empty',
        });
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
