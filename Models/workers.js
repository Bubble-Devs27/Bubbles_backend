const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  phone : Number,
  password : String,
  empID : String,
  vehicle : String,
  name : String,
  location : String,
  isActive : Boolean
})
const workers = mongoose.model("workers" , workerSchema);
module.exports =  workers;
