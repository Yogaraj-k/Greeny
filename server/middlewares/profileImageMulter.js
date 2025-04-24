const multer = require("multer");

const profileImageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/profilePicture");
	},
	filename: function (req, file, cb) {
		const uniqSuffix = Date.now();
		cb(null, "IMG-" + uniqSuffix + file.originalname);
	},
});

const profileImageUpload = multer({ storage: profileImageStorage });
module.exports = profileImageUpload;
