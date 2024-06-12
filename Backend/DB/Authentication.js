const express = require('express');
const User = require('./schema');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//youtube soln.cookie parser call krre hai taki cookies get krle and ye help krta hai vo use krne me = req.cookies.pigeonJWT in cookiecheck.js
const cookieParser = require("cookie-parser");
router.use(cookieParser()); //middle ware hai taki kabhi bhi ye parser call ho to middle warecall jojaye


const cookiecheck = require("./cookiecheck");



router.get('/', (req,res)=>{
    res.send("hello");
});


router.post('/register', async (req,res)=>{

    const {nickname,username,password}=req.body;

    if(!nickname || !username || !password){
        return res.status(422).json({message: "fill all the fields"});
    }

    try{

       const repeat_user= await User.findOne({username : username});

       if(repeat_user){
        return res.status(422).json({message: "username already Exists !!"});
       }

       const new_user = new User({nickname , username  , password });

      await new_user.save();
      res.status(201).json({message:"User Registered Successfully"});

    }catch(err){
        console.log(err);
    }
    // console.log(req.body);
});


router.post('/login', async (req,res)=>{
    try{
            const {username , password}=req.body;
            if(!username || !password){
                return res.status(400).json({error: "Fill both userid and password !!"});
            }

            
            const userlogin= await User.findOne({username : username});

            // if not userid matched then will show error
            if(!userlogin){
                return res.status(400).json({error: "Wrong credentials"});
            }

            // comparing for hash value that we created to store in DB for password
            const isMatch = await bcrypt.compare(password,userlogin.password);
            // we are generating jwt token when a user logged in
            const usertoken = await userlogin.generateAuthToken();
            console.log(usertoken);
            res.cookie("pigeonJWT",usertoken);
             if(isMatch){
                return res.json({message: "User login successfully !"});

            }
            else{
                return res.status(400).json({error: "Wrong credentials"});
            }
    }catch(err){
        console.log(err);
    }
});


router.get('/usercokkie', cookiecheck, async (req,res)=>{
    console.log("middle ware call hora");
    res.send(req.rootUser);
    
});

module.exports = router;
// kyu export krra hai jbki conn.js me to nhi krna pdra export...... and kb kb export krna pdta h???;