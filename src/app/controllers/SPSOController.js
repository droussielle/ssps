const accountmodel = require("../models/Account");
const {  generatepassword, formatedata, generatesignature, validatepassword,generatesalt } = require('../../auth/side');

class SPSOController {
  //SIGNUP SERVICE 
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
          email: email,
          password: userPassword,
          name: name,
          role: "spso",
          profile_image: profile_image,
          phone_number: phone_number,
          salt: salt,
        });
        
        const result = await newAccount.save();

        return formatedata({id:result._id});

      } catch(err){
        throw err;
      }
    }

  }


}

module.exports = new SPSOController();
