const express = require('express');
const router = express.Router();
const Userdb = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

router.post('/register', async (req,res)=>{

    const {fname,email,password,cpassword} = req.body;
    if(!fname || !email || !password || !cpassword){
        res.status(422).json({error:"fill all the details"});
    }
    try {
        
        const preUser = await Userdb.findOne({email:email});
        if(preUser){
            res.status(422).json({error:"This email is already Exist"});
        }else if(password !== cpassword){
            res.status(422).json({error:"Password and Confirm Password Not Match"});
        }else{
            const finalUser = new Userdb({
                fname,email,password,cpassword
            });
            const storeData = await finalUser.save();
            res.status(201).json({status:201, storeData});
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
});

router.post('/login', async (req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body);
    if(!email || !password){
        res.status(422).json({error:"fill all the details"});
    }
    try {
        const userValid = await Userdb.findOne({email:email});
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(422).json({error:"Invalid Deails"});
                console.log("password not match");
            }else{

                const token = await userValid.generateAuthtoken();
                //console.log(token);
                res.cookie('userCookie',token,{
                    expires: new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result = {
                    userValid,
                    token
                };
                res.status(201).json({status:201, result});
            }
        }else{
            console.log("Not have accoumt");
        }
    } catch (error) {
        console.log(error);
    }
});
    router.get('/validuser',auth, async (req,res)=>{
        try {
            const validUserOne = await Userdb.findOne({_id:req.userId});
            res.status(201).json({status:201,validUserOne});
        } catch (error) {
            res.status(401).json({status:401,error});
        }
    });
    router.get('/logout',auth, async (req,res)=>{
        try {
            req.rootUser.tokens = req.rootUser.tokens.filter((curelm)=>{
                return curelm.token !== req.token;
            });

            res.clearCookie('userCookie',{path:'/'});

            req.rootUser.save();

            res.status(201).json({status:201});

        } catch (error) {
            res.status(401).json({status:401, error});
        }
    })

module.exports = router;