const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainSchema = new Schema({
	token: { type: String },
	profilePicture: { type: String },
	contactNumbers: [{ contactType: { type: String }, contactNumber: { type: Number } }],
	addresses: [{ address: { type: String }, addressType: { type: String } }],
	cards: [{ cardType: { type: String }, ownerName: { type: String }, cardNumber: { type: String } }],
});

const MainModel = mongoose.model("MainModel", MainSchema);

module.exports = MainModel;
