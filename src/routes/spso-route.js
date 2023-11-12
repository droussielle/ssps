const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userauth = require("../auth/check-auth");

const SPSO = require("../app/controllers/SPSOController");

//SIGNUP SERVICE CREATE NEW SPSO USER INCLUDING: NEW ACCOUNT INSTANCE & SPSO ID


router.get("/",(req,res,next)=>{
    return res.status(200).json({
        message:"This is spso route"
    })
})

router.post("/signup", async (req,res,next)=>{
    try{
        const {email,password,name,profile_image,phone_number,spso_ID} = req.body;

        if( typeof(email) === "undefined" || typeof(password) === "undefined" || typeof(name) === "undefined" || typeof(profile_image) === "undefined" || typeof(phone_number) === "undefined" || typeof(spso_ID) ==="undefined") {
            return res.status(400).json({
                message: 'invalid request data format'
            })
        }

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

router.get("/printer",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const mydata = await SPSO.getAllPrinter();
        return res.json(mydata);

    }   catch (err){
        next(err);
    }
});

router.get("/printer/:id",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const id = req.params.id;
        const mydata = await SPSO.getPrinter(id);
        return res.json(mydata);

    }   catch (err){
        next(err);
    }
});

router.post("/printer",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const {brand,model,shortDescription,location,printerStatus}=req.body;
        if(typeof(location) === 'undefined' || typeof(printerStatus) ==='undefined'){
            return res.status(400).json({
                message:'invalid reques data format: location and printerStatus field must be specified',
            })
        }  

        const mydata = await SPSO.addPrinter({brand,model,shortDescription,location,printerStatus});

        return res.json(mydata);

    }   catch(err){
        next(err);
    }
});


router.patch("/printer/:id",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const status = req.body.status;
        const id = req.params.id;  
        const mydata = await SPSO.updatePrinterStatus(id,status);
        return res.json(mydata);

    }catch(err){
        next(err);
    }

});

router.delete("/printer/:id",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const id = req.params.id;
        const mydata= await SPSO.deletePrinter(id);
        return res.json(mydata);
    } catch(err){
        next(err);
    }
});

router.get("/student",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const mydata = await SPSO.getAllStudent();
        return res.json(mydata);
    }   catch(err){
        next(err);
    }
});

router.get("/student/:student_ID",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const student_ID= req.params.student_ID;
        const mydata = await SPSO.getStudent(student_ID);
        return res.json(mydata);
    }catch(err){
        next(err);
    }
})

//NOT TESTEST YET
router.post("/print-order/permitted-file-type",userauth,async (req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const permittedFileType = req.body.fileTypes;
        const mydata = await SPSO.setFileType(permittedFileType);
        return res.json(mydata);
    }catch (err){
        next(err);
    }
});

router.get("/staff",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const mydata = await SPSO.getAllStaff();
        return res.json(mydata);
    }   catch(err){
        next(err);
    }
});

router.get("/staff/:staff_ID",userauth,async(req,res,next)=>{
    try{
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const staff_ID= req.params.staff_ID;
        const mydata = await SPSO.getStaff(staff_ID);
        return res.json(mydata);
    }catch(err){
        next(err);
    }
});

router.post("/set-default-pages",userauth,async(req,res,next)=>{
    try {
        const isSPSO = await SPSO.spsoAuthorize(req.user);
        if (!isSPSO){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const amount = req.body.amount;
        const mydata = await SPSO.setDefaultCredit(amount);
        return res.json(mydata);

    } catch (err) {
        next(err);
    }
});


module.exports = router;
