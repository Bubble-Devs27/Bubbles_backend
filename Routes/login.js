const express = require('express');
const { genOTp ,verifyOtp ,addNewUser ,loginAtPhone} = require('../Controllers/user');
const loginRouter = express.Router();

loginRouter.route("/genOTP")
.post(genOTp)

loginRouter.route("/verifyOTP")
.post(verifyOtp)
loginRouter.route("/update")
.post(addNewUser)

loginRouter.route("/phone")
.post(loginAtPhone)

module.exports = loginRouter;