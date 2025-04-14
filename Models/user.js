const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    Phone : Number,
    address : String,
    custID : Number
})
const userModel = mongoose.model("user" , userSchema);
module.exports =  userModel;
