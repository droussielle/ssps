const AccountRouter = require("./account-route");
const StudentRouter = require("./student-route");
const StaffRouter = require("./staff-route");
const SPSORouter = require("./spso-route");
const PrinterRouter = require("./printer-route");
const PrintingOrderRouter = require("./printingorder-route");
const PrintingOrderDetailRouter = require("./printingorderdetail-route");

module.exports = {
    account : AccountRouter,
    student : StudentRouter,
    staff: StaffRouter,
    spso: SPSORouter,
    printer:PrinterRouter,
    printingorder : PrintingOrderRouter,
    printingorderdetail: PrintingOrderDetailRouter
}