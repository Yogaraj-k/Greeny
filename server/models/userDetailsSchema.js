const mongoose = require("mongoose");

const userDetails = mongoose.Schema({
  userID: {
    type: String,
    // required: true,
  },
  AddtoCardItems: {
    type: [
      {
        productID: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("userDetails", userDetails);
