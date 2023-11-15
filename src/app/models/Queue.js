const mongoose = require('mongoose');
const PrintOrder = require('./PrintOrder');
const Schema = mongoose.Schema;

const Queue = new Schema({
  printer: { type: Schema.Types.ObjectId, required: true, ref: 'Printer' },
  printOrders: [
    {
      PrintOrder: { type: Schema.Types.ObjectId, ref: 'PrintOrder' },
    },
  ],
});

module.exports = mongoose.model('Queue', Queue);
