const mongoose = require("mongoose");

const userProductCardDetails = new mongoose.Schema({
	image: {
		type: String,
		// required: true,
	},
	imageSlider: {
		type: [String],
		// required: true,
	},
	rating: {
		type: Number,
		// required: true,
	},
	productName: {
		type: String,
		// required: true,
	},
	productDescription: {
		type: String,
		// required: true,
	},
	oldPrice: {
		type: Number,
		// required: true,
	},
	newPrice: {
		type: Number,
		// required: true,
	},

	sale: {
		type: Boolean,
		// required: true,
	},
	newProduct: {
		type: Boolean,
		// required: true,
	},
	featuredItems: {
		type: Boolean,
		// required: true,
	},
	discountPercentage: {
		type: Number,
		// required: true,
	},
});

module.exports = mongoose.model("productCardDetails", userProductCardDetails);
