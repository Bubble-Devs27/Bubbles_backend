const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    phone : Number,
    prefTime : String,
    prefDate : Object,
    status :String,
    completeTime : Object,
    completeDate : Object,
    address : String,
    orderType : String,
    carType : String,
    feedback :Number,
    empID : String,
    price : Number,
    otp : Number
})
const orderModel = mongoose.model("orders" , orderSchema)
module.exports = orderModel