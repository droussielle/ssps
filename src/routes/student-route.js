const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Student = require("../app/controllers/StudentController");

router.post("/", async (req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
});




module.exports = router;
