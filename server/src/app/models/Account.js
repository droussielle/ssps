const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Account = new Schema({
  _id: ObjectId,
  id: { type: String, minLength: 7, maxLength: 7 },
  username: String,
  userpassword: String,
  idRole: Number,
});
module.exports = mongoose.model("Account", Account);
