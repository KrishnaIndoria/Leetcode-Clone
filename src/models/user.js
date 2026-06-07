const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        require:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        maxLength:20
    },
    email:{
        type:String,
        unique:true,
        require:true,
        trim:true,
        lowercase:true,
        immutable:true
    },
    age:{
        type:Number,
        min:10
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    problemsolved:{
        type:[String]
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User = mongoose.model("user",userSchema);
module.exports = User;