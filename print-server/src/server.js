const express = require('express');
const expressApp = require('./app');

const startServer = async () => {
  const app = express();
  await expressApp(app);
  app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });
};
startServer();
