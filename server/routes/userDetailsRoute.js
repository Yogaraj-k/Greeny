const express = require("express");
const userDetailsDatas = express.Router();
const { authenticate, authenticateParams } = require("../middlewares/authMiddleWare");
const { postAddToCardDetailsControllers, getAddToCardDetailsControllers, IncrementAddToCartProductQuantity, DecrementAddToCartProductQuantity, DeleteProductFromCartController } = require("../controllers/userDetailsControllers");

userDetailsDatas.post("/post-AddToCardDetails", authenticate, postAddToCardDetailsControllers);

userDetailsDatas.get("/get-userCartDetails/:token", authenticateParams, getAddToCardDetailsControllers);

userDetailsDatas.put("/IncrementAddToCartProductQuantity/:productID/:token", authenticateParams, IncrementAddToCartProductQuantity);

userDetailsDatas.put("/DecrementAddToCartProductQuantity/:productID/:token", authenticateParams, DecrementAddToCartProductQuantity);

userDetailsDatas.delete("/DeleteProductFromCart/:productID/:token", authenticateParams, DeleteProductFromCartController);

module.exports = userDetailsDatas;
