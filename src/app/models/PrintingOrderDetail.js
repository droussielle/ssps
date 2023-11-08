const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const PrintingOrderDetail = new Schema({
  _id: ObjectId,
  orderId: Number,
  studentId: String,
  printerId: String,
  fileName: String,
  totalPage: Number,
  settings: String,
});
module.exports = mongoose.model("PrintingOrderDetail", PrintingOrderDetail);
