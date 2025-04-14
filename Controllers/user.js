const userModel = require("../Models/user");
const custIDgen = require("../Services/custIDgen");
const { generateToken } = require("../Services/jwtToken");


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
    const ID = custIDgen();
    const details = await userModel.create({
        name : req.body.name,
        Phone : req.body.Phone,
        address :req.body.address,
        custID : ID
    })
    token = generateToken(req.body.Phone)
    return res.json({
        details : details,
        token : token
    })
}
module.exports = {genOTp ,verifyOtp, addNewUser}