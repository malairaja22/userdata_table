const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userdetailSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    profilepic:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Userdetail",userdetailSchema);