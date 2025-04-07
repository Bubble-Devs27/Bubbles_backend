const completedModel = require('../Models/completedOrders')
const orderModel = require('../Models/orders')


async function fetchOrders(req, res){
    
    try{
        //Orders Should be fetched from Redis only
        const data = await orderModel.find({status : 'booked'})
        return res.json(data)
    }
    catch(error){
        return res.json("Internel Server Error")
    }
}

async function acceptOrder(req, res){
    try{
        //Update in Redis as well, so that user will be updated on his end
        const data = await orderModel.updateOne(
            {_id : req.body._id},{
                $set :{ status :'accepted', empID : req.body.empID}
            }
        )
    }
    catch(error){
       return res.json(error)
    }
}

async function completedOrder(req, res){
    try{
        // Update in redis as well (So that user get notified) and delete from it after some time
        if(code === 6969){
            // delete from "OrderModel" and shift to "Completed order table" in database
           const completion = await orderModel.updateOne({_id : req.body._id},{$set:{status :'completed'}})
           await completedModel.create(completion)
           await orderModel.deleteOne({_id : req.body._id})
           return res.json("Completed")

        }
        else{
            return res.json("Wrong OTP")
        }
    }
    catch(error){
        return res.json(error)
    }
}