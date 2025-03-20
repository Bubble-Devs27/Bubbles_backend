const express = require('express');
const {workerLogin , workerRegister , workerDetails} = require('../Controllers/workerAuth');

const workerAuthRouter = express.Router();

workerAuthRouter.route("/login")
.post(workerLogin)

workerAuthRouter.route("/register")
.post(workerRegister)

workerAuthRouter.route("/getDetails")
.post(workerDetails)

module.exports = workerAuthRouter;