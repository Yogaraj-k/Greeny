const mongoose = require("mongoose");

const OrderDetails = new mongoose.Schema({
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
        default: 1,
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
  pending: {
    type: Boolean,
    default: false,
    //required: true,
  },
  dispatch: {
    type: Boolean,
    default: false,
    //required: true,
  },
  complete: {
    type: Boolean,
    default: false,
    //required: true,
  },
});

module.exports = mongoose.model("orderDetails", OrderDetails);
