const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const PrintOrderController = require('../app/controllers/PrintOrderController');

router.post('/', userauth, async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = req.user._id;
    const { printer, note, fileName, printProperties } = req.body;
    const beginTime = new Date();
    const estimatedEndTime = new Date(
      Number(beginTime) +
        1000 * printProperties.numberOfPages * printProperties.copies,
    );
    const status = false;
    const fileLocation = 'somewhereovertherainbow';

    return res.status(200).json('Print OK');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
