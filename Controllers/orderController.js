const orderModel = require('../Models/orders')
const { random4Gen } = require('../Services/randomNumber')

async function bookOrder(req ,res){
     const otp = random4Gen();
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
        otp : otp,
        price : req.body.price,
        payment : req.body.payment
    }

    
    try{
        // Check for Pending orders for a particular Phone Number
        
      const isPendingOrder = await orderModel.findOne({phone : request.phone , status : "Booked"})
      if(req.body.payment == "cash"){
        if(isPendingOrder ){
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
      if(req.body.payment ==="upi"){
        if(isPendingOrder){
            console.log("order Already pending")
            // If order is pending then do not book another
            return res.json("pending")
        } 
        else{
            console.log("No Pending order found, Open UPI App")
            return res.json(request)
        }
      }
      else{
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
        const order = await orderModel.findOne({phone : req.body.phone , status : "Booked"})
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
    console.log(req.body._id)
  try{
    await orderModel.updateOne({_id : req.body._id},{
        $set :{status : "canceled"}})
    console.log("canceled")
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