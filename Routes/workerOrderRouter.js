const express = require("express")
const workerOrderRouter = express.Router()

workerOrderRouter.route("/fetchOrder")
.post()

workerOrderRouter.route("/accept")
.post()

workerOrderRouter.route("/completed")
.post()

module.exports = workerOrderRouter