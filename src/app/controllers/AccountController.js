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

  async changePassword(userinputs){
    const {oldPassword,newPassword,user} = userinputs;
    console.log(user);
    try{
      const myuser = await accountmodel.findOne({email:user.email});
      if(myuser){
        const validPassword = await validatepassword(oldPassword,myuser.password,myuser.salt);
        if (validPassword){
          const newHashedPassword = await generatepassword(newPassword,myuser.salt);
          const result = await accountmodel.updateOne({_id:myuser._id},{$set:{
            password:newHashedPassword
          }});
          return formatedata(result);
        } else{
          return formatedata({
            message:"Invalid request"
          });
        }

      } return formatedata (myuser);

    }catch(err){
      throw err;
    }

  }

  async increaseCredit(userinputs){ 
    const {increment, user } = userinputs;
    try{
      const myuser = await accountmodel.findOne({_id:user._id});
      const newBalance = myuser.credit + increment;

      const result = await accountmodel.updateOne({_id:myuser._id},{$set:{
        credit:newBalance
      }});
      
      return formatedata(result);

    } catch (err){
      throw err;
    }
  }
  


}

module.exports = new AccountController();
