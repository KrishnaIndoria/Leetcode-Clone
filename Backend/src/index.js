const express = require('express')
const app = express();
require('dotenv').config(); //dotenv fetches all the env variables into process.env
const main = require('./config/db')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problemRouter');
const submitRouter = require('./routes/Submit');
const AiRouter = require('./routes/AiChat');
const RedisClient  = require('../src/config/redis');
const cors = require('cors');

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/user",authRouter);
app.use("/problem",problemRouter);
app.use("/submission",submitRouter);
app.use("/Ai",AiRouter);

const InitailizeConnection = async()=>{
  try{
    await Promise.all([main(),RedisClient.connect()]);
    console.log("DB IS CONNECTED");

    app.listen(process.env.PORT,()=>{
      console.log("Server listening at port no :"+process.env.PORT)
    })
  }
  catch(err){
    console.log("Error:"+err);
  }
}

InitailizeConnection();