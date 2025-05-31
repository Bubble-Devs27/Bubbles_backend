var jwt = require('jsonwebtoken');

function generateToken(data){
 const token = jwt.sign(data  , "testkey")
 return token
}

function verifyToken(token){
   try{
  
    const decoded = jwt.verify(token , "testkey")
    return decoded;
   }
   catch(err){
    console.log(err)
   }
}

module.exports = {generateToken , verifyToken}