const express = require('express');
const { genOTp ,verifyOtp ,addNewUser} = require('../Controllers/user');
const loginRouter = express.Router();

loginRouter.route("/genOTP")
.post(genOTp)

loginRouter.route("/verifyOTP")
.post(verifyOtp)
loginRouter.route("/addNewUser")
.post(addNewUser)

module.exports = loginRouter;