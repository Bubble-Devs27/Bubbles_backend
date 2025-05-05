const {randomNumGen} = require('./randomNumber')
function custIDgen(){
    const now = new Date();
    const year = JSON.stringify(now.getFullYear());
    const month = JSON.stringify(now.getMonth()); 
    const random = JSON.stringify(randomNumGen())
    const custID = year + month + random;
    return custID
    
}
module.exports = custIDgen