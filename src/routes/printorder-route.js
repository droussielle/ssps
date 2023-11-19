const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');
const uploader = require('../auth/print-function');

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

// router.post('/upload',uploader,async(req,res,next)=>{
//   try{

//   } catch(err){
//     next(err);
//   }
// })

module.exports = router;
