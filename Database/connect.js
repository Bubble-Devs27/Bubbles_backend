const mongoose = require('mongoose');
url = "mongodb+srv://user69:user69@cluster0.sbyih.mongodb.net/Bubbles?retryWrites=true&w=majority&appName=Cluster0"


function connectMongoDb(){
    return mongoose.connect(url).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)})
}

module.exports = connectMongoDb
