const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {
  account,
  student,
  staff,
  spso,
  printer,
  printorder,
} = require('./routes');

module.exports = async (app) => {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/account', account);
  app.use('/student', student);
  app.use('/staff', staff);
  app.use('/spso', spso);
  app.use('/printer', printer);
  app.use('/printorder', printorder);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message:
          'Errors happen, status code: ' +
          (error.status || 500) +
          ' message: ' +
          error.message,
      },
    });
  });
};
