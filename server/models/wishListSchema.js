const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
	token: { type: String },
	productID: [{ type: String }],
});

const wishListModel = mongoose.model("WishList", wishListSchema);
module.exports = wishListModel;
