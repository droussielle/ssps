const accountmodel = require("../models/Account");
const {  generatepassword, formatedata, generatesignature, validatepassword,generatesalt } = require('../../auth/side');

class AccountController {
  //LOGIN SERVICE
  async login (userinputs){
    const {email,password} = userinputs;

    try{
      const existUser = await accountmodel.findOne({email:email});
      if (existUser){
        const validPassword = await validatepassword(password,existUser.password,existUser.salt);   

        if(validPassword){
          const token = await generatesignature({email: existUser.email, _id:existUser._id});
          return formatedata({
            message:"Login successfully",
            email:email,
            name:existUser.name,
            role:existUser.role,
            token:token
          })
        }
      }
      return formatedata(null);
    } catch (err){
      throw err;
    }

  }


}

module.exports = new AccountController();
