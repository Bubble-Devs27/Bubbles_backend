const empIDgen = require("../Services/empIDgen")
const workers = require("../Models/workers")
const {generateToken  , verifyToken} = require('../Services/jwtToken')

async function workerLogin(req , res){
    console.log("inlogin")
  try{
    const feed = await workers.findOne({phone : req.body.phone , password : req.body.password})
    if(feed){
        const token = generateToken(feed.empID)
        return res.json({status :'success' , token : token})
    }
    else{
        console.log("NO creds")
        return res.json({
            status :"Credentials not found"
        })
    }
  }
  catch(error){ console.log(error); return res.json({
    status :"Internal Server Error"
})}  
   
}




async function workerRegister(req , res){
    console.log("in register")
    const empID = empIDgen()
    try{
        const check = await workers.findOne({phone : req.body.phone})
       if(!check){ 
        const feed = await workers.create({
        phone : req.body.phone,
        password : req.body.password,
        vehicle : req.body.vehicle,
        empID : empID
    })

    const token = generateToken(feed.empID)
    console.log(token)
    return res.json({status :'success' , token : token})
   }
   else{
    console.log(check.empID)
    return res.json({status :'Phone Number already in use'})}
    }
    catch(error){
        console.log(error)
        return res.json({status : "Internal Server Error"})
    }
    
}

async function workerDetails(req, res){
    const empID =  verifyToken(req.body.token)
    try{
        const details =  await workers.findOne({empID : empID})
        if(details){return res.json(details)}
        else { return res.json({status : "invalid"})}
        
    }
    catch(err){
        console.log(err)
        return res.json({status : "invalid"})
    }
   
}   



module.exports = {workerLogin , workerRegister,workerDetails}