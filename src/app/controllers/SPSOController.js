const accountmodel = require("../models/Account");
const spsomodel = require("../models/SPSO");
const studentmodel = require("../models/Student");
const printermodel = require("../models/Printer");
const staffmodel = require("../models/Staff");
const mongoose = require("mongoose");
const {  generatepassword, formatedata, generatesignature, validatepassword,generatesalt } = require('../../auth/side');

class SPSOController {
  //SIGNUP SERVICE 
  async signup (userinputs){
    const {email,password,name,profile_image,phone_number,spso_ID} = userinputs;
    const existUser = await accountmodel.findOne({email:email});

    if(existUser){
      return null;
    } else{
      try{
        let salt = await generatesalt();
        let userPassword = await generatepassword(password,salt);
        const newAccount = new accountmodel({
          _id: new mongoose.Types.ObjectId(),
          email: email,
          password: userPassword,
          name: name,
          role: "spso",
          profile_image: profile_image,
          phone_number: phone_number,
          salt: salt,
        });

        const newSPSO = new spsomodel({
          spso_ID: spso_ID,
          account: newAccount._id
        });

        const [newAccountResult, newSPSOResult] = await Promise.all([newAccount.save(), newSPSO.save()]);
        
        const result = {
          newAccountResult,
          newSPSOResult
        }

        return result;

      } catch(err){
        throw err;
      }
    }

  }

  async addPrinter(userinputs){
    try{
      const {brand,model,shortDescription,location,printerStatus}=userinputs;
      const newPrinter = new printermodel({
        _id: new mongoose.Types.ObjectId(),
        brand: brand,
        model:model,
        shortDescription: shortDescription,
        location:location,
        printerStatus:printerStatus
      });

      const result = await newPrinter.save();

      return formatedata(result);

    } catch(err){
      throw err;
    }
    
  }

  async updatePrinterStatus(id,status){
    try{
      const result = await printermodel.updateOne({_id:id},{$set:{
        printerStatus:status
      }})

      return formatedata(result);

    }catch(err){
      throw err;
    }
  }

  async deletePrinter(id){
    try{
      const result = await printermodel.deleteOne({_id:id});
      return formatedata(result);
    } catch(err){
      throw err;
    }
  }

  async getAllPrinter(){
    try{
      const result = await printermodel.find();
      return formatedata(result);
    } catch(err){
      throw err;
    }
  }

    async getPrinter(id){
      try{
        const result = await printermodel.findById(id);
        return formatedata(result);
      }catch(err){
        throw err;
      }
    }

    async getAllStudent(){
      try{
        const result = await studentmodel.find();
        return formatedata(result);
      } catch(err){
        throw err;
      }
    }

    async getStudent(student_ID){
      try{
        const result = await studentmodel.findOne({student_ID: student_ID});
        return formatedata(result);
      }catch(err){
        throw err;
      }
    }
    async getAllStaff(){
      try{
        const result = await staffmodel.find();
        return formatedata(result);
      } catch(err){
        throw err;
      }
    }

    async getStaff(staff_ID){
      try{
        const result = await staffmodel.findOne({staff_ID: staff_ID});
        return formatedata(result);
      }catch(err){
        throw err;
      }
    }

    async setFileType(permittedFileType){
      try{
        const result = await printermodel.updateMany({"$set":{"permittedFileType":permittedFileType}});
        return formatedata(result);
      } catch(err){
        throw err;
      }
    }


}

module.exports = new SPSOController();
