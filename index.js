const express = require('express')
const loginRouter = require('./Routes/login')
const connectMongoDb = require('./Database/connect')
const orderRouter = require('./Routes/order')
const workerOrderRouter = require('./Routes/workerOrderRouter')
const workerAuthRouter = require('./Routes/WorkerAuth')
const cors = require("cors")
const path = require('path');
const app = express()
const port = 5000
app.use(express.json())
app.use(cors());
connectMongoDb();
app.use("/login" , loginRouter)
app.use("/order"  , orderRouter )
app.use("/worker/order" , workerOrderRouter)
app.use("/worker/auth" , workerAuthRouter)
app.get("/" ,  (req ,res)=>{res.json("Bubbles")})


app.use(express.static(path.join(__dirname, 'public')));
app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})