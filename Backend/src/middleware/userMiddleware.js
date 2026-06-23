const jwt = require('jsonwebtoken');
const User = require('../models/user');
const redisClient = require('../config/redis');

// this is to validate or verify jwt tokens sent by user during request 
const userMiddleware = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token)
            throw new Error("Token not present");

        const payload = jwt.verify(token,process.env.JWT_KEY);

        const {_id} = payload;
        const user = await User.findById(_id);
        if(!user)
            throw new Error("User does not exist");

        // now checking if the token in present in redis blocklist or not
        const IsBlocked = await redisClient.exists(`token:${token}`);

        if(IsBlocked)
            throw new Error("Invalid Token");

        req.user = user;
        next();
    }
    catch(err){
        res.send("Error:"+err);
    }
    

}

module.exports = userMiddleware;