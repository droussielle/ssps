const Printer = require("../models/Printer");
var mongoose = require("mongoose");
class PrinterController {
  // [GET] /printer
  async getPrinters(req, res) {
    try {
      if (req.query.apitoken) {
        const printers = await Printer.find().exec();
        if (printers) {
          res.json({
            printers: printers,
          });
        } else {
          res.status(400).json({
            error: "Invalid",
          });
        }
      } else {
        res.status(400).json({
          check: false,
          msg: "Không có apitoken",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "Server error",
      });
    }
  }

  // [GET] /printer/getPrinter?
  async getPrinter(req, res) {
    try {
      if (!req.query.id) {
        res.json({ check: false, msg: "Thiếu id máy in" });
      }
      if (req.query.id && req.query.apitoken) {
        const printer = await Printer.find({ id: req.query.id }).exec();
        if (printer) {
          res.json({
            printer: printer,
          });
        } else {
          res.status(400).json({
            error: "Invalid id",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "Server error",
      });
    }
  }
  async addPrinter(req, res) {
    try {
      if (req.query.apitoken) {
        const { id, brand, model, shortDescription, location, printerStatus } =
          req.query;
        if (!id) {
          res.json({ check: false, msg: "Thiếu id" });
        }
        if (!brand) {
          res.json({ check: false, msg: "Thiếu brand" });
        }
        if (!model) {
          res.json({ check: false, msg: "Thiếu model" });
        }
        if (!shortDescription) {
          res.json({ check: false, msg: "Thiếu shortDescription" });
        }
        if (!location) {
          res.json({ check: false, msg: "Thiếu location" });
        }
        if (!printerStatus) {
          res.json({ check: false, msg: "Thiếu printerStatus" });
        } else {
          var _id = new mongoose.Types.ObjectId();
          const printer = await Printer.find({ id: id }).exec();
          if (!printer && printer.length == 0) {
            Printer.create({
              _id: _id,
              id: id,
              brand: brand,
              model: model,
              location: location,
              printerStatus: printerStatus,
            });
            res.json({
              check: true,
            });
          } else {
            res.json({
              check: false,
              msg: "Máy in đã tồn tại",
            });
          }
        }
      } else {
        res.status(400).json({
          check: false,
          msg: "Không có apitoken",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "Lỗi server",
      });
    }
  }
  async statusPrinter(req, res) {
    try {
      if (req.query.apitoken) {
        if (!req.query.id) {
          res.json({ check: false, msg: "Thiếu id" });
        } else {
          const printer = await Printer.findOne({ id: req.query.id }).exec();
          if (printer) {
            printer.printerStatus = !printer.printerStatus;
            await printer.save();
            res.json({ check: true });
          } else {
            res.json({ check: false, msg: "Máy in không tồn tại" });
          }
        }
      } else {
        res.status(400).json({
          check: false,
          msg: "Không có apitoken",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        error: "Lỗi server",
      });
    }
  }
}

module.exports = new PrinterController();
