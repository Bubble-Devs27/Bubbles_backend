const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    Phone : Number,
    Address : Array
})
const userModel = mongoose.model("user" , userSchema);
module.exports =  userModel;
