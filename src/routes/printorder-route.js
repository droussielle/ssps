const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const PrintOrderController = require('../app/controllers/PrintOrderController');

router.get('/', userauth, (req, res, next) => {
  return res.status(200).json({
    message: 'this is printorder route',
  });
});

module.exports = router;
