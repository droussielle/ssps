const AccountRouter = require("./account");
const PrinterRouter = require("./printer");
function route(app) {
  app.use("/login", AccountRouter);
  app.use("/printer", PrinterRouter);
}
module.exports = route;
