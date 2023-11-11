const accountmodel = require("../models/Account");
const spsomodel = require("../models/SPSO");
const mongoose = require("mongoose");
const {  generatepassword, formatedata, generatesignature, validatepassword,generatesalt } = require('../../auth/side');

class SPSOController {
  //SIGNUP SERVICE 
  async signup (userinputs){
    const {email,password,name,profile_image,phone_number,spso_ID} = userinputs;
    const existUser = await accountmodel.findOne(email);

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
          spsoID: spso_ID,
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


}

module.exports = new SPSOController();
