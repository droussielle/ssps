const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Staff = new Schema({
  _id: ObjectId,
  id: { type: String, minLength: 7, maxLength: 7 },
  staffName: String,
});
module.exports = mongoose.model("Staff", Staff);
