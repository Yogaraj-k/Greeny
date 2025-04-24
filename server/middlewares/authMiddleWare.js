const asyncHandler = require("../middlewares/catchAsyncError");
const jwt = require("jsonwebtoken");
const userDataSchema = require("../models/userDataSchema");

const authenticate = asyncHandler(async (req, res, next) => {
  let token = await req.body.token;
  if (token) {
    try {
      const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await userDataSchema.findById(decodeToken.userId).select("-password -confirmPassword");
      // console.log(req.user);
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Not authorized - token failed");
    }
  } else {
    res.status(402);
    throw new Error("Not authorized - no token");
  }
});

const authenticateParams = asyncHandler(async (req, res, next) => {
  let token = await req.params.token;
  if (token) {
    try {
      const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decodeToken) {
        req.userParams = await userDataSchema.findById(decodeToken.userId).select("-password -confirmPassword");
        next();
      }
    } catch (error) {
      res.status(400);
      throw new Error("Not authorized - token failed");
    }
  } else {
    res.status(402);
    throw new Error("Not authorized - no token");
  }
});

const authorized = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an Admin");
  }
});

module.exports = { authenticate, authorized, authenticateParams };
