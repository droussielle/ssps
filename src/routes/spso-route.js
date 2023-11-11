const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SPSO = require("../app/controllers/SPSOController");

//SIGNUP SERVICE CREATE NEW SPSO USER INCLUDING: NEW ACCOUNT INSTANCE & SPSO ID


router.get("/default",(req,res,next)=>{
    return res.status(200).json({
        message:"This is spso route"
    })
})

router.post("/signup", async (req,res,next)=>{
    try{
        const {email,password,name,profile_image,phone_number,spso_ID} = req.body;
        const mydata = await SPSO.signup({email,password,name,profile_image,phone_number,spso_ID});
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
