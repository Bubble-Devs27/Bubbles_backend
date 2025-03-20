const express = require('express');
const { genOTp ,verifyOtp} = require('../Controllers/user');
const loginRouter = express.Router();

loginRouter.route("/genOTP")
.post(genOTp)

loginRouter.route("/verifyOTP")
.post(verifyOtp)

module.exports = loginRouter;