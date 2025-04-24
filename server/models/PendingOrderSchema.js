const mongoose = require("mongoose");

const PendingOrders = mongoose.Schema({
  token: {
    type: String,
    //required: true,
  },
  orderId: {
    type: String,
    //required: true,
  },
  amount: {
    type: Number,
    // required: true,
  },
  paymentDate: {
    type: Date,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  contact: {
    type: String,
    // required: true,
  },
  productDetails: [
    {
      productdetail: {
        type: String,
        //required: true,
      },
      quantity: {
        type: Number,
        //required: true,
      },
    },
  ],
  userDetails: {
    type: [
      {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    // required: true,
  },
});

module.exports = mongoose.model("Pending orders", PendingOrders);
