const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require("../auth/check-auth");


const AccountController = require("../app/controllers/AccountController");

router.post("/login", async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        const{data} = await AccountController.login({email,password});
        // console.log(data);
        return res.json(data);
    }catch(err){
        next(err);
    }
});

router.post("/change-password",userauth,async(req,res,next)=>{
    try{
        const {oldPassword,newPassword} = req.body;
        const user = req.user;
        const data = await AccountController.changePassword({oldPassword,newPassword,user});
        return res.json(data);
    }   catch (err){
        next(err);
    }
});

router.post("/buy-credit",userauth, async(req,res,next)=>{
    try{
        const {increment} = req.body;
        const user = req.user;
        const mydata = await AccountController.increaseCredit({increment,user});
        return res.json(mydata);
    }   catch(err){
        next(err);
    }
})




module.exports = router;
