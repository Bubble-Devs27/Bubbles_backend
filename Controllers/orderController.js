const orderModel = require('../Models/orders')

async function bookOrder(req ,res){
    const data ={
        phone : 8427791755,
        prefTime :{from :{hour : 10 , minute : 0} , to :{hour : 12 , minute : 0}},
        prefDate :{day : 4 , month : 2 ,year : 2025},
        status : 'complete',
        completeTime :{hour : 12 , minute : 0},
        completeDate :{day : 4 , month : 2 ,year : 2025}, 
        address :'161 , Hargobind Nagar',
        type :'full Car Wash',
        feedback : 0
    }
    const request = {
        phone : req.body.phone,
        prefTime :req.body.prefTime,
        prefDate :req.body.prefDate,
        status : 'Booked',
        completeTime :req.body.completeTime,
        completeDate :req.body.completeDate, 
        address :req.body.address,
        type :req.body.type,
        feedback : 0,
        empID :''
    }
    try{
       const data = await orderModel.create(request)

       // Logic to add booking data to redis

        return res.json(data)
    }
    catch(error){
        return res.json(error)
    }  
}

async function checkStatus(req, res){
    try{
        const {status} = await orderModel.findByID(req.body._id)
        
        // Status Should be Check from Redis only

        return res.json(status)
    }
    catch(error){
        console.log(error)
        return res.json("Internel server error")
    }
}

async function cancelOrder(req , res){

    // update in MongoDB and Remove from redis
    
  try{
    await orderModel.updateOne({_id : req.body.id},{
        $set :{status : "canceled"}})
    return res.json("canceled")
  }
  catch(error){
    return res.json(error)
  }
    
}

async function historyOrder(req , res){
    try{
        const result = await orderModel.find({phone :8427791755})
         return res.json(result)
     }
     catch(error){
         return res.json(error)
     }
}
module.exports = {bookOrder , cancelOrder , historyOrder ,checkStatus}