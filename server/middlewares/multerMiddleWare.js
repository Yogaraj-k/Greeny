const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/productImage");
	},
	filename: function (req, file, cb) {
		const uniqSuffix = Date.now();
		cb(null, uniqSuffix + file.originalname);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
