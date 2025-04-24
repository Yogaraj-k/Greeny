const userDetails = require("../models/userDetailsSchema");
const asyncHandler = require("../middlewares/catchAsyncError");

exports.postAddToCardDetailsControllers = async (req, res) => {
	try {
		const { productID } = req.body;
		const token = req.user._id;
		console.log("Received product:", productID);
		console.log("Received token:", token);
		let user = await userDetails.findOne({ userID: token });

		if (!user) {
			const user = await userDetails.create({
				userID: token,
				AddtoCardItems: [{ productID, quantity: 1 }],
			});
		} else {
			const itemIndex = user.AddtoCardItems.findIndex((item) => item.productID === productID);
			if (itemIndex !== -1) {
				user.AddtoCardItems[itemIndex].quantity += 1;
				console.log(user.AddtoCardItems[itemIndex]);
			} else {
				user.AddtoCardItems.push({ productID });
			}
		}
		await user.save();
		res.send(user.AddtoCardItems);
	} catch (error) {
		console.error("Error uploading images:", error);
	}
};
exports.getAddToCardDetailsControllers = asyncHandler(async (req, res, next) => {
	try {
		const userID = req.userParams._id;
		// console.log("hello ..." + userID);
		const details = await userDetails.findOne({ userID: userID });
		res.send(details);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.json({ error: "hello error" });
	}
});

exports.IncrementAddToCartProductQuantity = asyncHandler(async (req, res, next) => {
	try {
		const userID = req.userParams._id;
		const { productID } = req.params;
		console.log(productID + "    " + userID);
		const doc = await userDetails.findOne({ userID: userID });
		const updatedItems = doc.AddtoCardItems.map((product) => {
			if (product.productID === productID) {
				return { ...product, quantity: product.quantity + 1 };
			}
			return product;
		});
		doc.AddtoCardItems = updatedItems;
		await doc.save();
		console.log(doc.AddtoCardItems);
		res.send(doc.AddtoCardItems);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.json({ error: "hello error" });
	}
});
exports.DecrementAddToCartProductQuantity = asyncHandler(async (req, res, next) => {
	try {
		const userID = req.userParams._id;
		const { productID } = req.params;
		console.log(productID + "    " + userID);
		const doc = await userDetails.findOne({ userID: userID });
		console.log(doc);
		for (let i = 0; i < doc.AddtoCardItems.length; i++) {
			const product = doc.AddtoCardItems[i];
			if (product.productID === productID && product.quantity >= 1) {
				product.quantity -= 1;
				if (product.quantity === 0) {
					doc.AddtoCardItems.splice(i, 1);
					i--;
				}
			}
		}
		await doc.save();
		console.log(doc);
		res.send(doc.AddtoCardItems);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.json({ error: "hello error" });
	}
});

exports.DeleteProductFromCartController = asyncHandler(async (req, res, next) => {
	try {
		const userID = req.userParams._id;
		const { productID } = req.params;
		console.log(productID + "    " + userID);
		const doc = await userDetails.findOne({ userID: userID });
		const index = doc.AddtoCardItems.findIndex((product) => product.productID === productID);

		if (index !== -1) {
			doc.AddtoCardItems.splice(index, 1);
		}
		await doc.save();

		console.log(doc.AddtoCardItems);
		res.send(doc.AddtoCardItems);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.json({ error: "hello error" });
	}
});
