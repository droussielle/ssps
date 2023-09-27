const Account = require("../models/Account");

class AccountController {
  // [GET] /login
  async auth(req, res) {
    try {
      const { username, userpassword } = req.query;
      if (username && username !== "" && userpassword && userpassword !== "") {
        const account = await Account.findOne({
          username: username,
          userpassword: userpassword,
        }).exec();
        if (account) {
          res.json({
            apitoken: account._id,
            idRole: account.idRole,
          });
        } else {
          res.status(400).json({
            error: "Invalid credentials",
          });
        }
      } else {
        res.status(400).json({
          error: "Username and password are required",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "Server error",
      });
    }
  }
}

module.exports = new AccountController();
