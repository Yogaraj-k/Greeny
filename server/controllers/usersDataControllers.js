const userDataSchema = require("../models/userDataSchema");
const bcrypt = require("bcryptjs");
const { generateLoginToken, generateRegisterToken, forgetPasswordTokenVerify } = require("../utlis/createToken");
const asyncHandler = require("../middlewares/catchAsyncError");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const upload = require("../middlewares/multerMiddleWare");
const dateSchema = require('../models/DateTimeSchema');

// userData - /userDatas/users
exports.userDatasControllers = asyncHandler(async (req, res, next) => {
	const { userName, email, password, confirmPassword } = req.body;

	const userExists = await userDataSchema.findOne({ email });
	if (userExists) {
		throw new Error("User already exist");
	} else {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);
		const data = new userDataSchema({
			userName: userName,
			email: email,
			password: hashPassword,
			confirmPassword: hashConfirmPassword,
		});

		await data.save();
		const token = generateRegisterToken(res, data._id);
		res.json(data);
	}
});

// user-Login - login/loginUser
exports.loginUserControllers = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const existingUser = await userDataSchema.findOne({ email });

	if (existingUser) {
		const verifyPassword = await bcrypt.compare(password, existingUser.password);

		if (verifyPassword) {
			const loginToken = generateLoginToken(res, existingUser._id);
			res.status(200).json(loginToken.token);
			// return;
		} else {
			throw new Error("Email or password does not exist");
		}
	} else {
		// res.status(401)
		throw new Error("Email or password does not exist");
	}
});

exports.CountdownTimedate = asyncHandler(async (req ,res, next) => {
	try {
		const { time } = req.body;
		if (!time) {
		  return res.status(400).send('Time is required');
		}
		const countdownDate = new dateSchema({ countdownTime: time }); // Ensure the field name matches the schema
		await countdownDate.save();
		res.status(200).send('Countdown time set successfully!');
	  } catch (error) {
		console.error('Error setting countdown time:', error);
		res.status(500).send('Internal server error');
	  }
	});

	exports.getCountdownDate = asyncHandler(async(req ,res ,next) => {
		try {
			const data = await DataModel.find();
			res.json(data);
			console.log(data);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	  }); 

exports.getUserDataController = asyncHandler((req, res, next) => {
	// console.log("hello");
	const email = req.params.email;
	userDataSchema
		.findOne({ email })
		.then((userData) => {
			res.send(userData);
		})
		.catch((err) => {
			console.log(err);
		});
});

// userdata get
exports.getUserDataControllers = asyncHandler(async (req, res, next) => {
	const registeredUsersData = await userDataSchema.find();
	if (registeredUsersData) {
		res.send(registeredUsersData);
	} else {
		res.send("users not found");
	}
});


// get single user data with id
exports.getSingleUserDataControllers = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.userParams;
		const userDetails = await userDataSchema.findById(id);
		const userData = {
			email: userDetails.email,
			name: userDetails.userName,
			isAdmin:userDetails.isAdmin
		};
		res.send(userData);
	} catch (err) {
		res.send(err);
	}
});


// user-Logout - /logOut/logOutUser
exports.logOutUserControllers = asyncHandler((req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.json({ message: "logout sucessfully" });
});

// forgetUser password - /forgetPassword/forgetUser
exports.forgetUserControllers = asyncHandler(async (req, res, next) => {
	const { email } = req.body;

	const emailExist = await userDataSchema.findOne({ email });

	if (!emailExist) {
		throw new Error("Enter your Registered Email");
	} else {
		const token = forgetPasswordTokenVerify(res, emailExist._id);

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "vigneshvignesh4727@gmail.com",
				pass: "ahcj ldau xrmj wxia",
			},
		});

		// async..await is not allowed in global scope, must use a wrapper
		async function main() {
			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: "vigneshvignesh4727@gmail.com",
				to: email,
				subject: "Reset Password Link",
				text: `http://localhost:3000/changePassword/${token}`,
			});

			console.log("Message sent: %s", info.messageId);
			res.status(200).json({ message: "Link sent successfully" });
			// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
		}

		main().catch(console.error);
	}
});

// Change password - /changePassword/changeUserPassword

exports.changePasswordControllers = asyncHandler(async (req, res, next) => {
	const { token } = req.params; // Extract token from request parameters

	// Check if token is present
	if (!token) {
		return res.status(400).json({ message: "Token is required" });
	}

	const { newPassword, confirmPassword } = req.body;
	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

		// res.json(decoded.userId);
		const id = decoded.userId;

		const salt = await bcrypt.genSalt(10);

		const hashPassword = await bcrypt.hash(newPassword, salt);
		const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);

		await userDataSchema.findByIdAndUpdate({ _id: id }, { password: hashPassword, confirmPassword: hashConfirmPassword });
		res.status(200).json({ message: "Password Changed Successfully" });
	} catch (error) {
		// Handle different error scenarios with appropriate status codes and messages
		if (error.name === "TokenExpiredError") {
			return res.status(400).json({ message: "Token expired" });
		}
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Invalid token" });
		}

		// If it's not TokenExpiredError or JsonWebTokenError, it might be another internal error
		res.status(500).json({ message: "Internal server error" });
	}
});

exports.productDetailsControllers = async (req, res, next) => {
	const rating = req.body.rating;
	const productName = req.body.productName;
	const productDescription = req.body.productDescription;
	const oldPrice = req.body.oldPrice;
	const newPrice = req.body.newPrice;
	const sale = req.body.sale;
	const newProduct = req.body.newProduct;
	const featuredItems = req.body.featuredItems;
	const discountPercentage = req.body.discountPercentage;
	console.log(sale, newProduct, featuredItems);

	let images = [];

	try {
		if (req.file) {
			const image = req.file.filename;
			console.log("Image received:", image);
		} else if (req.files) {
			images = req.files.map((file) => file.filename);
		}
		console.log("Images received:", images);

		userProductDetails.create({
			image: images.shift(),
			imageSlider: images,
			rating: rating,
			productName: productName,
			productDescription: productDescription,
			oldPrice: oldPrice,
			newPrice: newPrice,
			sale: sale,
			newProduct: newProduct,
			featuredItems: featuredItems,
			discountPercentage: discountPercentage,
		});
	} catch (error) {
		console.error("Error uploading images:", error);
	}
};

exports.getProductDetailsControllers = async (req, res) => {
	try {
		const products = await userProductDetails.find();
		res.json({ status: "ok", data: products });
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

exports.getAdminSingleUserDataControllers = asyncHandler(async (req, res, next) => {
	try {
		const  id  = req.params.id;
		const userDetails = await userDataSchema.findById(id);
		const userData = {
			email: userDetails.email,
			name: userDetails.userName,
		};
		res.send(userData);
	} catch (err) {
		res.send(err);
	}
});