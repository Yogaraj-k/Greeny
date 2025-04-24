const pendingOrders = require("../models/PendingOrderSchema");
const asyncHandler = require("../middlewares/catchAsyncError");

exports.postPendingOrdersControllers = async (req, res) => {
  console.log(req.body);
  try {
    const { orderId, amount, paymentDate, productDetails, userDetails, contact, address, token } = req.body;

    // Use Order.create to create and save a new Order document
    const PendingOrder = await pendingOrders.create({
      token,
      orderId,
      amount,
      paymentDate: new Date(paymentDate),
      productDetails,
      userDetails,
      contact,
      address,
    });

    res.send(PendingOrder);
  } catch (error) {
    console.error("Error saving order details:", error);
    res.status(500).json({ error: "Failed to save order details" });
  }
};

exports.getPendingOrdersController = async (req, res) => {
  try {
    const pendingorders = await pendingOrders.find();
    res.send(pendingorders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
