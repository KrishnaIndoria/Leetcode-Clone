const { validate } = require("../utils/validator")
const {User} = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async(req,res)=>{
    try{
        validate(req.body);
        const {firstName,email,password} = req.body;
        req.body.password = await bcrypt.hash(password,10); //hashing password n thn storing in db

        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id,emailID:email},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).send("User registered successfully");
    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email)
            throw new Error("Invalid credentials");
        if(!password)
            throw new Error("Invalid credentials");

        const user = await User.find({email});
        const match = bcrypt.compare(req.body.password,user.password);

        if(!match)
            throw new Error("Invalid password");

        const token = jwt.sign({_id:user._id,emailID:email},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).send("Logged in succesfully");

    }
    catch(err){
        res.status(401).send("Error:"+err);
    }
}

const logout = async(req,res)=>{
    try{

    }
    catch(err){

    }
}

module.exports = {userRegister,login,logout,getProfile};