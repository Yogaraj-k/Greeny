const express = require("express");
const pendingOrdersDatas = express.Router();
const { authenticate } = require("../middlewares/authMiddleWare");
const { postPendingOrdersControllers, getPendingOrdersController } = require("../controllers/pendingOrdersController");

pendingOrdersDatas.post("/postPendingOrders", postPendingOrdersControllers);
pendingOrdersDatas.get("/getPendingOrders", getPendingOrdersController);

module.exports = pendingOrdersDatas;
