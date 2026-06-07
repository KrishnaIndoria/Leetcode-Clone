const express = require('express')
const app = express();
require('dotenv').config(); //dotenv fetches all the env variables into process.env
const main = require('./config/db')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

main()
.then( ()=>{
    app.listen(process.env.PORT,()=>{
      console.log("Server running at port no:"+process.env.PORT);
    })
})
.catch(err=>console.log("Error occured:"+err));