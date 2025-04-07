const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  phone : Number,
  address : String,
  PackageID : Number,
  status : String,
  costumerID : Number

})
const packageModel = mongoose.model("Package" , packageSchema);
module.exports =  packageModel;
