const asyncHandler = require("../middlewares/catchAsyncError");
const walletModel = require("../models/walletDataSchema");

exports.postWalletData = asyncHandler(async (req, res, next) => {
	try {
		const { amountToAdd } = req.body;
		const token = req.user.id;
		let existingDoc = await walletModel.findOne({ token });
		if (existingDoc) {
			existingDoc.currentBalance += parseInt(amountToAdd);
			existingDoc.transactionList.push({ amount: amountToAdd, transactionDate: Date.now() });
			await existingDoc.save();
			res.send(existingDoc);
		} else {
			await walletModel
				.create({
					token: token,
					currentBalance: amountToAdd,
					transactionList: {
						amount: amountToAdd,
						transactionDate: Date.now(),
					},
				})
				.then((response) => res.send(response));
		}
	} catch (error) {
		res.send(error);
	}
});

exports.getWalletData = asyncHandler(async (req, res, next) => {
	try {
		const token = req.userParams._id;
		let doc = await walletModel.findOne({ token });
		if (doc) {
			res.send(doc);
		} else {
			res.send("Not Found");
		}
	} catch (error) {
		res.send(error);
	}
});
