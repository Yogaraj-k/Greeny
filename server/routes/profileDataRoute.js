const express = require("express");
const { authenticate, authenticateParams } = require("../middlewares/authMiddleWare");
const {
	getProfileDataControllers,
	postProfileDataContactControllers,
	postProfileDataAddressControllers,
	postProfileDataCardControllers,
	postProfileImageControllers,
	delContactControllers,
	delAddressControllers,
	delCardControllers,
	delProfilePicControllers,
	editContactController,
	editProfileDataAddressControllers,
} = require("../controllers/prfoileDataController");
const profileImageUpload = require("../middlewares/profileImageMulter");
const profileDataRouter = express.Router();
const {getAdminRegisterDataController} = require("../controllers/prfoileDataController")

// exports.postProfileDataControllers = async (req, res) => {
// 	console.log(req.body);
// };

// profileDataRouter.get("/:token", getProfileDataControllers);

profileDataRouter.route("/:token").get(authenticateParams, getProfileDataControllers);

profileDataRouter.route("/contact").post(authenticate, postProfileDataContactControllers);

profileDataRouter.route("/address").post(authenticate, postProfileDataAddressControllers);

profileDataRouter.route("/card").post(authenticate, postProfileDataCardControllers);

profileDataRouter.route("/postImage").post( profileImageUpload.single("profileImage"), authenticate ,  postProfileImageControllers);

profileDataRouter.route("/editContact/:index").put( authenticate , editContactController);

profileDataRouter.route("/address/:index").put( authenticate, editProfileDataAddressControllers);

profileDataRouter.route("/delProfilePic/:token").delete( authenticateParams, delProfilePicControllers);

profileDataRouter.route("/delContact/:token/:index").delete( authenticateParams, delContactControllers);

profileDataRouter.route("/delAddress/:token/:index").delete( authenticateParams, delAddressControllers);

profileDataRouter.route("/delCard/:token/:index").delete( authenticateParams, delCardControllers);

// admin route

profileDataRouter.route("/getData/:token/:id").get(authenticateParams, getAdminRegisterDataController)

module.exports = profileDataRouter;
