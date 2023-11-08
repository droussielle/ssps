const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const PrintingOrder = new Schema({
  _id: ObjectId,
  orderId: Number,
  studentId: String,
  printerId: String,
  beginTime: Date,
  endTime: Date,
  note: String,
});
module.exports = mongoose.model("PrintingOrder", PrintingOrder);
