const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
	token: { type: String },
	currentBalance: { type: Number },
	transactionList: [{ amount: { type: Number }, transactionDate: { type: Date } }],
});

const walletModel = mongoose.model("WalletData", walletSchema);
module.exports = walletModel;
