const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs").promises;
const url = "http://127.0.0.1:3000";

let printerName;

//SIGNUP SERVICE CREATE NEW SPSO USER INCLUDING: NEW ACCOUNT INSTANCE & SPSO ID
function readInput() {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    interface.question("Vui lòng nhập tên máy in: ", (answer) => {
      interface.close();
      resolve(answer);
    })
  );
}
function main() {
  printerName = readInput();
}

router.post("/", (req, res, next) => {
  // return res.status(200).json({
  //   message: 'This is student route',
  // });
  try {
    printFile(linux_code)
    // const { fileName } = req.body;

    // if (typeof fileName === "undefined") {
    //   return res.status(400).json({
    //     message: "invalid request data format",
    //   });
    // }
    console.log(printerName);
    return res.status(200).json(printerName);
  } catch (err) {
    next(err);
  }
});

// router.post("/signup", async (req, res, next) => {
//   try {
//     const { email, password, name, profile_image, phone_number, student_ID } =
//       req.body;

//     if (
//       typeof email === "undefined" ||
//       typeof password === "undefined" ||
//       typeof name === "undefined" ||
//       typeof profile_image === "undefined" ||
//       typeof phone_number === "undefined" ||
//       typeof student_ID === "undefined"
//     ) {
//       return res.status(400).json({
//         message: "invalid request data format",
//       });
//     }

//     const mydata = await Student.signup({
//       email,
//       password,
//       name,
//       profile_image,
//       phone_number,
//       student_ID,
//     });
//     if (mydata === null) {
//       return res.status(400).json({
//         error: {
//           message: "Invalid email or user ID",
//         },
//       });
//     } else if (mydata.error) {
//       return res.status(400).json({
//         error: {
//           message: "Request failed",
//         },
//       });
//     }

//     return res.status(200).json(mydata);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
