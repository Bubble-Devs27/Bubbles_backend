const orderModel = require('../Models/orders')

async function bookOrder(req ,res){
     
    const request = {
        phone : req.body.phone,
        prefTime :req.body.prefTime,
        prefDate :req.body.prefDate,
        status : 'Booked',
        completeTime :{},
        completeDate :{}, 
        address :req.body.address,
        orderType :req.body.orderType,
        carType : req.body.carType,
        feedback : 0,
        empID :'',
        otp : 2368,
        price : req.body.price
    }


    
    try{
        // Check for Pending orders for a particular Phone Number
        
       const isPendingOrder = await orderModel.findOne({phone : request.phone})
       if(isPendingOrder){
        console.log("order Already pending")
        // If order is pending then do not book another
        return res.json("pending")
       } 
       else {
         // Book order
         const data = await orderModel.create(request) 
         console.log("created")
         return res.json(data)
       }
      
    }
    catch(error){
        return res.json(error)
    }  
}

async function checkStatus(req, res){
    console.log(req.body)
    try{
        // const {status} = await orderModel.findByID(req.body._id)
        const order = await orderModel.findOne(req.body)
        // Status Should be Check from Redis only

        return res.json(order)
    }
    catch(error){
        console.log(error)
        return res.json("Internel server error")
    }
}

async function cancelOrder(req , res){
     // Logic to check id order is canceled within 1 hour = then cancel; if order canceled after one hour the do not cancel;
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