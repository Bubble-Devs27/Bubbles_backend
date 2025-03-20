const randomNumGen = require("./randomNumber")
function empIDgen(){
    const now = new Date();
    const year = JSON.stringify(now.getFullYear());
    const month = JSON.stringify(now.getMonth()); 
    const random = JSON.stringify(randomNumGen())
    const empID = year + month + random;
    return empID
    
}
module.exports = empIDgen