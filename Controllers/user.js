const userModel = require("../Models/user");
const custIDgen = require("../Services/custIDgen");
const { generateToken, verifyToken } = require("../Services/jwtToken");


// Main Logic
function genOTp(req , res){
    const otp = 1547;
    return res.json({
        otp : otp
    })
}

async function  verifyOtp(req ,res){
    let c = 0;
    for(i=0; i< 4 ; i++){
        c= (c*10)+ parseInt(req.body.otp[i])
    }
    if(c==6969){ //OTP verification logic should be placed here
        //  
        let token = null;
        const details = await userModel.findOne({
            "Phone" : req.body.phone   
        })
        if (details){
            token = generateToken(req.body.phone)
        }
        return res.json({
        details : details,
        token : token,
        status :"verified"
       })
    }
    else{
        console.log("Not verified")
        return res.json({status :"Not verified"})
      
    }
    
    
}

async function addNewUser(req,res){
    
     const phone = verifyToken(req.body.token);
      if (!phone) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    try {
       const result =  await userModel.findOneAndUpdate({Phone :phone} , {$set :{name : req.body.name}} , {upsert : false , returnDocument: 'after' })
       console.log(result)
       if(result){
        return res.status(200).json(result)
       }
       else {
        return res.status(201)
       }
    }
    catch (err){
        res.status(202).json({"error" : "internal server error"})
        console.log(err)
    }
}

async function loginAtPhone (req,res){
    const ID = custIDgen();
    if(req.body.otp ==1234){
        const userDetails =await userModel.findOne({ "Phone" : req.body.Phone})
        if(userDetails){
            return res.status(200).json({
                details : userDetails,
                token : generateToken(req.body.Phone)
            })
        }
        else {
           try{
             const userDetails =await userModel.create({
                name :'',
                Phone : req.body.Phone,
                address :'',
                custID :ID
            })
            return res.status(201).json({
                details : userDetails,
                token : generateToken(req.body.Phone)
            })
           }
           catch(err){
                res.status(500).json({"error" : err})
           }
        }
    }
    else {
        return res.status(205).json({status :"Invalid OTP"})
    }
}
module.exports = {genOTp ,verifyOtp, addNewUser ,loginAtPhone}