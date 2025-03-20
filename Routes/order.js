const express = require('express');
const { bookOrder, cancelOrder, historyOrder, checkStatus } = require('../Controllers/orderController');
const orderRouter = express.Router()

orderRouter.route("/book")
.post(bookOrder)

orderRouter.route("/cancel")
.post(cancelOrder)

orderRouter.route("/status")
.post(checkStatus)

orderRouter.route("/history")
.post(historyOrder)

module.exports = orderRouter