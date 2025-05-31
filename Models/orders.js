const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    phone : Number,
    prefTime : Object,
    prefDate : Object,
    status :String,
    completeTime : Object,
    completeDate : Object,
    address : Object,
    feedback :Number,
    empID : String,
    price : Number,
    otp : Number,
    payment : String,
    order :Object
})
const orderModel = mongoose.model("orders" , orderSchema)
module.exports = orderModel