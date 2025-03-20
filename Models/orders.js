const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    phone : Number,
    prefTime : Object,
    prefDate : Object,
    status :String,
    completeTime : Object,
    completeDate : Object,
    address : String,
    type : String,
    feedback :Number,
    empID : String
})
const orderModel = mongoose.model("orders" , orderSchema)
module.exports = orderModel