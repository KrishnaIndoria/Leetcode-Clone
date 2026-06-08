const express = require('express');
const authRouter = express.Router();
const{userRegister,login,logout,getProfile} = require('../controllers/userAuthenticate');

authRouter.post("/Register",userRegister);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("getProfile",getProfile);

module.exports = authRouter;