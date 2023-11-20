const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');
const multer = require('multer');

const PrintOrderController = require('../app/controllers/PrintOrderController');

router.post('/', userauth, async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = req.user._id;
    const { printer, note, fileName, printProperties } = req.body;
    const beginTime = new Date();

    //NOT FINISHED YET
    const estimatedEndTime = new Date(
      Number(beginTime) +
        1000 * printProperties.numberOfPages * printProperties.copies,
    );
    const status = false;
    // const fileLocation = 'somewhereovertherainbow';
    const data = await PrintOrderController.createprintorder({
      user,
      printer,
      note,
      fileName,
      printProperties,
      beginTime,
      estimatedEndTime,
      status,
    });

    if (data.error) {
      return res.status(400).json(data.error);
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/upload/:_printorderid', async (req, res, next) => {
  try {
    // console.log("hello world");
    const _id = req.params._printorderid;
    const fileType = 'pdf';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads');
      },
      filename: function (req, file, cb) {
        cb(null, _id + '.' + fileType);
      },
    });

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 20, // files  smaller than 20MB are accepted
        fileFilter: fileFilter,
      },
    });

    upload.single('printFile')(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          error: {
            message: err,
          },
        });
      }
    });

    const data = await PrintOrderController.uploader(_id);

    if (data.error) {
      return res.status(400).json(data.error);
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
