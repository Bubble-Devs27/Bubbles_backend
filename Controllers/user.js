const userModel = require("../Models/user");
const { generateToken } = require("../Services/jwtToken");


// Main Logic
function genOTp(req , res){
    const otp = 1547;
    return res.json({
        otp : otp
    })
}

async function  verifyOtp(req ,res){
    if(req.body.otp === 6969){ //OTP verification logic should be placed here
        const token = generateToken(req.body.phone)
        
        const data = await userModel.findOne({
            "Phone" : req.body.phone   
        })
        
        return res.json({
        data : data,
        token : token
       })
    }
    return res.json("Not Verified")
    
}
module.exports = {genOTp ,verifyOtp, }