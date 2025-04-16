const mongoose = require('mongoose')
const completedorderSchema = mongoose.Schema({
    phone : Number,
    prefTime : Object,
    prefDate : Object,
    status :String,
    completeTime : Object,
    completeDate : Object,
    address : String,
    ordeType : String,
    carType :String,
    feedback :Number,
    empID : String
})
const completedModel = mongoose.model("orders" , completedorderSchema)
module.exports = completedModel