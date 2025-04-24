const asyncHandler = require("../middlewares/catchAsyncError");
const wishListModel = require("../models/wishListSchema");

exports.postWishListController = asyncHandler(async (req, res, next) => {
	try {
		const { productId } = req.body;
		const token = req.user.id;
		let doc = await wishListModel.findOne({ token });
		if (doc) {
			if (doc.productID.includes(productId)) {
				doc.productID = doc.productID.filter((product) => product !== productId);
			} else {
				doc.productID.push(productId);
			}
			await doc.save();
			res.send(doc);
		} else {
			const newDoc = await wishListModel.create({ token: token, productID: [productId] });
			await newDoc.save();
			res.send(newDoc);
		}
	} catch (err) {
		res.send(err);
	}
});

exports.getWishListController = asyncHandler(async (req, res, next) => {
	try {
		const token = req.userParams._id;
		await wishListModel
			.findOne({ token })
			.then((response) => {
				res.send(response);
			})
			.catch((err) => {
				res.send("Not Found");
			});
	} catch (err) {
		res.send(err);
	}
});

exports.deleteWishListController = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.params;
		const token = req.userParams._id;
		let doc = await wishListModel.findOne({ token });
		doc.productID = doc.productID.filter((item) => item !== id);
		await doc.save();
		await res.send(doc);
	} catch (err) {
		console.log(err);
	}
});
