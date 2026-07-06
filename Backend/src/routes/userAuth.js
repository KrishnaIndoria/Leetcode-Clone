const express = require('express');
const authRouter = express.Router();
const{userRegister,login,logout,adminRegister,deleteProfile} = require('../controllers/userAuthenticate');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

authRouter.post("/Register",userRegister);
authRouter.post("/login",login);
authRouter.post("/logout",userMiddleware,logout);
authRouter.post("/admin/Register",adminMiddleware,adminRegister);
authRouter.delete("/deleteProfile",userMiddleware,deleteProfile);
authRouter.get("/check",userMiddleware,(req,res)=>{
    const reply = {
        firstname:req.user.firstName,
        emailID:req.user.email,
        _id:req.user._id,
        role:req.user.role
    }

    res.status(201).json({
        user:reply,
        message:"Valid User"
    })
})

module.exports = authRouter;