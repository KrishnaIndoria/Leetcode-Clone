const validator  = require("../utils/validator")
const User = require("../models/user");
const Submission = require('../models/submission');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RedisClient  = require('../config/redis');

const userRegister = async(req,res)=>{
    try{
        validator(req.body);
        const {firstName,email,password} = req.body;
        req.body.password = await bcrypt.hash(password,10); //hashing password n thn storing in db

        req.body.role = "user";
        const user = await User.create(req.body);
        const reply = {
            firstName:user.firstName,
            emailID:user.email,
            _id:user._id
        }
        const token = jwt.sign({_id:user._id,emailID:email,role:'user'},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).json({
            user:reply,
            message:"User registered succesfully"
        });
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
}

const login = async(req,res)=>{
    try{
        // console.log(req.body);
        const {email,password} = req.body;
        if(!email)
            throw new Error("Invalid credentials");
        if(!password)
            throw new Error("Invalid credentials");

        const user = await User.findOne({email});
        if(!user)
            throw new Error("User not found");

        const match = await bcrypt.compare(req.body.password,user.password);

        if(!match)
            throw new Error("Invalid password");

        const reply = {
            firstName:user.firstName,
            emailID:user.email,
            _id:user._id
        };

        const token = jwt.sign({_id:user._id,emailID:email,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).json({
            user:reply,
            message:"Logged in succesfully"
        });

    }
    catch(err){
        res.status(401).send("Error:"+err);
    }
}

const logout = async(req,res)=>{
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);

        await RedisClient.set(`token:${token}`,'Blocked');
        await RedisClient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Logged out succesfully");
    }
    catch(err){
        res.status(503).send("Error:"+err);
    }
}

const adminRegister = async(req,res)=>{
        try{
        validator(req.body);
        const {firstName,email,password} = req.body;
        req.body.password = await bcrypt.hash(password,10); //hashing password n thn storing in db

        req.body.role = "admin";
        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id,emailID:email,role:'admin'},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).send("User registered successfully");
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
}

const deleteProfile = async(req,res)=>{
    try{
        const userID = req.user._id;
        await User.findByIdAndDelete(userID);
        await Submission.deleteMany({userID});
        res.status(200).send("Profile Deleted succesfully");
    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}

module.exports = {userRegister,login,logout,adminRegister,deleteProfile};