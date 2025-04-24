const express = require("express");
const { postWalletData, getWalletData } = require("../controllers/walletDataController");
const { authenticate, authenticateParams } = require("../middlewares/authMiddleWare");
const walletRouter = express.Router();

walletRouter.post("/", authenticate, postWalletData);

walletRouter.get("/:token", authenticateParams, getWalletData);

module.exports = walletRouter;
