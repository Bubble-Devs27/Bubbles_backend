const orderModel = require('../Models/orders');
const { verifyToken } = require('../Services/jwtToken');
const { random4Gen } = require('../Services/randomNumber')

async function bookOrder(req ,res){
     console.log(req.body)
     const phone = verifyToken(req.body.token);
      if (!phone) {
      return res.status(401).json({ message: "Invalid Token" });
    }
     console.log("Phone" ,phone)
     const otp = random4Gen();
     const request = {
        phone : phone,
        prefTime :req.body.prefTime,
        prefDate :req.body.prefDate,
        status : 'Booked',
        completeTime :{hour : 0 , min : 0  },
        completeDate :req.body.prefDate, 
        address :req.body.address,
        feedback : 0,
        empID :'',
        otp : otp,
        price : req.body.price,
        payment : req.body.payment,
        order : req.body.order
    }

    
    try{
        // Check for Pending orders for a particular Phone Number
        
      const isPendingOrder = await orderModel.findOne({phone,status: { $in: ["Booked", "Accepted", "Started"] }});
      if(req.body.payment == "cash"){
        if(isPendingOrder ){
            console.log("order Already pending" ,isPendingOrder)
            // If order is pending then do not book another
            return res.status(201).json("pending")
           } 
           else {
             // Book order
             const data = await orderModel.create(request) 
             console.log("created")
             return res.status(200).json(data)
           }
      }
      // if(req.body.payment ==="upi"){
      //   if(isPendingOrder){
      //       console.log("order Already pending")
      //       // If order is pending then do not book another
      //       return res.json("pending")
      //   } 
      //   else{
      //       console.log("No Pending order found, Open UPI App")
      //       return res.json(request)
      //   }
      // }
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

async function checkStatus(req, res) {
  try {
    const phone = verifyToken(req.body.token); // or await verifyToken(...) if async

    if (!phone) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const order = await orderModel.findOne({
  phone,
  status: { $in: ["Booked", "Accepted", "Started"] }
});

    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(205).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error in checkStatus:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
   
     const phone = verifyToken(req.body.token);
     
      if (!phone) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    try{
        const result = await orderModel.find({phone :phone ,status :"Completed" })
        console.log(result)
         return res.json(result)
     }
     catch(error){
         return res.json(error)
     }
}


module.exports = {bookOrder , cancelOrder , historyOrder ,checkStatus}