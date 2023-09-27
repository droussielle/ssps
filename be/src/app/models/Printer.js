const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Printer = new Schema({
  _id: ObjectId,
  id: { type: String, minLength: 6, maxLength: 6 },
  brand: String,
  model: String,
  shortDescription: String,
  location: String,
  printerStatus: Boolean,
});
module.exports = mongoose.model("Printer", Printer);
