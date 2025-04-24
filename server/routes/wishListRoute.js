const express = require("express");
const { postWishListController, getWishListController, deleteWishListController } = require("../controllers/wishListController");
const { authenticate, authenticateParams } = require("../middlewares/authMiddleWare");

const wishListRouter = express.Router();

wishListRouter.get("/:token", authenticateParams, getWishListController);

wishListRouter.post("/", authenticate, postWishListController);

wishListRouter.delete("/:token/:id", authenticateParams, deleteWishListController);

module.exports = wishListRouter;
