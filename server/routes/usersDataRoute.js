const express = require("express");
const userDatas = express.Router();
const { userDatasControllers, loginUserControllers, logOutUserControllers, forgetUserControllers, changePasswordControllers, getUserDataController, getUserDataControllers, getSingleUserDataControllers, CountdownTimedate, getCountdownDate , getAdminSingleUserDataControllers} = require("../controllers/usersDataControllers");
const { authenticateParams } = require("../middlewares/authMiddleWare");

userDatas.route("/users").post(userDatasControllers);

userDatas.route("/loginUser").post(loginUserControllers);

userDatas.route("/userData/:email").get(getUserDataController);

userDatas.route("/getuser").get(getUserDataControllers);

userDatas.route("/getuser/:token").get(authenticateParams, getSingleUserDataControllers);

userDatas.route("/logOutUser").post(logOutUserControllers);

userDatas.route("/forgetUser").post(forgetUserControllers);

userDatas.route("/changeUserPassword/:token").post(changePasswordControllers);

userDatas.route("/countdown").post(CountdownTimedate);

userDatas.route("/getCountdown").get(getCountdownDate);

// auth status




// admin detail get

userDatas.route("/getuserData/:token/:id").get(authenticateParams, getAdminSingleUserDataControllers);


module.exports = userDatas;
