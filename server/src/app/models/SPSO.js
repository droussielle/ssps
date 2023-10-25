const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const SPSO = new Schema({
  _id: ObjectId,
  id: { type: String, minLength: 7, maxLength: 7 },
  spsoName: String,
});
module.exports = mongoose.model("SPSO", SPSO);
