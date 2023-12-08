const express = require("express");
const expressApp = require("./app");
const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");
const { read } = require("fs");

const startServer = async () => {
  // console.log(printerName);
  const app = express();
  await expressApp(app);
  app.listen(3001);
  console.log("App listening at localhost:3001");
};

// module.exports = printerName;
startServer();
