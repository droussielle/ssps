const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Student = new Schema({
  _id: ObjectId,
  id: { type: String, minLength: 7, maxLength: 7 },
  studentName: String,
});
module.exports = mongoose.model("Student", Student);
