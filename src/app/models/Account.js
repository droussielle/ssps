const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Account = new Schema({
  email:{type:String, required:true},
  password:{type:String,required: true},
  name:{type: String,required:true},
  role:{type:String, required: true,default:'student'}, //{student,staff,spso}
  profile_image:{type:String},
  phone_number:{type:String,required:true},
  salt:String
});
module.exports = mongoose.model("Account", Account);
