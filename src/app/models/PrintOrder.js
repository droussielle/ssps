const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PrintOrder = new Schema({
  user: {type: Schema.Types.ObjectId,required:true,ref:'Account'},
  printer: {type: Schema.Types.ObjectId,required:true,ref:'Printer'},
  beginTime: Date,
  estimatedEndTime: Date,
  note: String,
  status: {type: Boolean, required:true,default:false}, //true = done, false = undone
  permittedFileType:{type:Array,default:["pdf","doc","docx"]},
  fileLocation: {type:String, required:true},
  printProperies :[ 
    {
        paperSize:{type:String,default:'a4'},
        numberOfPages:{type:Number,required:true},
        sided:{type: Boolean, default:true}, //true = double sided ; false = single sided
        copies:{type:Number,default:1},
        pagesPerSheet:{type:Number,default:1}
    }
  ]
});
module.exports = mongoose.model("PrintOrder", PrintOrder);
