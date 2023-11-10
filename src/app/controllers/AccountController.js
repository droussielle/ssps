const accountmodel = require("../models/Account");
const {  generatepassword, formatedata, generatesignature, validatepassword,generatesalt } = require('../../auth/side');

class AccountController {
  //LOGIN SERVICE
  async login (userinputs){
    const {email,password} = userinputs;

    try{
      const existUser = await accountmodel.findOne(email);
      if (existUser){
        const validPassword = await validatepassword(password,existUser.password,existUser.salt);   

        if(validPassword){
          const token = await generatesignature({email: existUser.email, _id:existUser._id});
          return formatedata({id:existUser._id,token});
        }
      }
      return formatedata(null);
    } catch (err){
      throw err;
    }

  }


  //SIGNUP SERVICE ===> PHÂN CHIA LẠI THÀNH 3 PHẦN CHO 3 ROUTE CHỨ KHÔNG ĐỂ NHƯ VẬY ĐƯỢC.
  async signup (userinputs){
    const {email,password,name,profile_image,phone_number} = userinputs;
    const existUser = await accountmodel.findOne(email);

    if(existUser){
      return null;
    } else{
      try{
        let salt = await generatesalt();
        let userPassword = await generatepassword(password,salt);
        const newAccount = new accountmodel({
          email,
          password,
          name,
          role,
          profile_image,
          phone_number,
          salt,
        });
        
        const result = await newAccount.save();

        return formatedata({id:result._id});

      } catch(err){
        throw err;
      }
    }

  }


}

module.exports = new AccountController();
