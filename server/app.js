const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router = express.Router();
const upload = require("../../E-commerce/server/middlewares/multerMiddleWare");
const fs = require("fs");
const model = require("../../E-commerce/server/models/userProductCardDetails");
// const multer = require("multer");

// backend configuration
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const mongoose = require("mongoose");
// const {userDatas, login, logOut} = require("./routes/usersDataRoute");
const userDatas = require("./routes/usersDataRoute");

// const{ getProductcard , postProductCard } = require("./routes/productCardRoute");

const productCardDatas = require("./routes/productCardRoute");
const userDetailsDatas = require("./routes/userDetailsRoute");
const profileDataRouter = require("./routes/profileDataRoute");
const walletRouter = require("./routes/walletRoute");
const wishListRouter = require("./routes/wishListRoute");
const orderDetailsRouter = require("./routes/orderDetailsRoute");
const pendingOrdersRouter = require("./routes/pendingOrdersRoute");
mongoose.set("strictQuery", true);

// middlewares

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use(Router);

// Routes

app.use("/userDatas", userDatas);

app.use("/login", userDatas);

app.use("/logOut", userDatas);

app.use("/forgetPassword", userDatas);

app.use("/changePassword", userDatas);

app.use(userDatas);

app.use(productCardDatas);
app.use(userDetailsDatas);
app.use(orderDetailsRouter);
app.use(pendingOrdersRouter);
app.use("/wishlist", wishListRouter);

app.use("/profileData", profileDataRouter);

app.use("/walletData", walletRouter);

app.use("/datetime", userDatas);

// app.post("/profileData", async (req, res) => {
// 	console.log(req.body);
// });

// mongodb connection

const db = process.env.MONGODB_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected Successfully !");
  })
  .catch((err) => {
    console.log(err);
  });

// server

const port = process.env.port;

app.use("/uploads/productImage", express.static(path.join(__dirname, "uploads", "productImage")));
app.use("/uploads/profilePicture", express.static(path.join(__dirname, "uploads", "profilePicture")));

app.listen(port, () => {
  console.log(`Server connected in port ${port} in ${process.env.NODE_ENV}`);
});

////////////////////////////////////////////////////  MULTER    //////////////////////////////////////////////
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqSuffix = Date.now();
//     cb(null, uniqSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/update-productDetails/:productID", (req, res) => {
// 	const productID = req.params.productID;
// 	const formData = req.body.productName; // Form data is available in req.body

// 	// Process the form data as needed
// 	console.log(formData);
// 	console.log(productID);

// 	// Respond to the client
// 	res.send("Form data received successfully");
// });
