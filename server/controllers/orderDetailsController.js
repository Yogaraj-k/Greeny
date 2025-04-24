const orderDetails = require("../models/OrderDetailsSchema");
const asyncHandler = require("../middlewares/catchAsyncError");

exports.postOrderDetailsControllers = async (req, res) => {
  // console.log(req.body);
  try {
    const { orderId, amount, paymentDate, productDetails, userDetails, contact, address } = req.body;
    const { id } = req.user;
    // Use Order.create to create and save a new Order document
    const Order = await orderDetails.create({
      token: id,
      orderId,
      amount,
      paymentDate: new Date(paymentDate),
      productDetails,
      userDetails,
      contact,
      address,
    });

    res.send(Order);
  } catch (error) {
    console.error("Error saving order details:", error);
    res.status(500).json({ error: "Failed to save order details" });
  }
};

exports.getOrderDetailsController = async (req, res) => {
  try {
    const orders = await orderDetails.find();
    // console.log(id);
    await res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.getSingleOrderDetailController = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.userParams;
    const orders = await orderDetails.find({ token: id });
    res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

exports.editOrderDetailsController = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const updatedOrder = await orderDetails.findByIdAndUpdate(orderId, { pending: true, dispatch: false, complete: false }, { new: true });

    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    } else {
      res.send(updatedOrder);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
exports.editCancelOrderDetailsController = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const updatedOrder = await orderDetails.findByIdAndUpdate(orderId, { pending: false, dispatch: false, complete: false }, { new: true });

    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    } else {
      res.send(updatedOrder);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

exports.editDispatchOrderDetailsController = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const updatedOrder = await orderDetails.findByIdAndUpdate(orderId, { pending: false, dispatch: true, complete: false }, { new: true });

    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    } else {
      res.send(updatedOrder);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
exports.editDispatchCancelOrderDetailsController = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const updatedOrder = await orderDetails.findByIdAndUpdate(orderId, { pending: false, dispatch: false, complete: false }, { new: true });

    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    } else {
      res.send(updatedOrder);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

exports.editCompleteOrderDetailsController = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const updatedOrder = await orderDetails.findByIdAndUpdate(orderId, { pending: false, dispatch: false, complete: true }, { new: true });

    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    } else {
      res.send(updatedOrder);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
exports.editCompleteCancelOrderDetailsController = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const updatedOrder = await orderDetails.findByIdAndUpdate(orderId, { dispatch: false, pending: true }, { new: true });
    if (!updatedOrder) {
      return res.send({ error: "Order not found" });
    } else {
      res.send(updatedOrder);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
