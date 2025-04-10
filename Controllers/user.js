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
    let c = 0;
    for(i=0; i< 4 ; i++){
        c= (c*10)+ parseInt(req.body.otp[i])
    }
    if(c==6969){ //OTP verification logic should be placed here
        // const token = generateToken(req.body.phone) 
        const token = "Hello";
       
        const details = await userModel.findOne({
            "Phone" : req.body.phone   
        })
        
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
module.exports = {genOTp ,verifyOtp, }