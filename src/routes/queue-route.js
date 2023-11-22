const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require('../auth/check-auth');

const PrintOrderController = require('../app/controllers/PrintOrderController');
const QueueController = require('../app/controllers/QueueController');

router.get('/', async (req, res, next) => {
  return res.status(200).json({
    messge: 'things good',
  });
});

router.get('/next', async (req, res, next) => {
  try {
    const { printer_id } = req.body;
    const { data } = await QueueController.getnext(printer_id);
    if (data.error) {
      return res.status(400).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const { printer_id } = req.body;
    const { data } = await QueueController.getall(printer_id);

    if (data.error) {
      return res.status(400).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
