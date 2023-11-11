const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SPSO = require("../app/controllers/SPSOController");

router.post("/signup", async (req,res,next)=>{
    try{
        const {email,password,name,profile_image,phone_number} = req.body;
        const mydata = await SPSO.signup({email,password,profile_image,phone_number});
        if (mydata === null){
            return res.json({
                message: "invalid email"
            });
        }   else{
            return res.status(200).json({
                message:"Account created successfully"
            });
        }
    }   catch (err){
        next(err);
    }
});




module.exports = router;
