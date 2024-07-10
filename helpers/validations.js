function checkEmailValidation(value) {
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(value);
}

function checkPhoneValidation(value) {
	const mobileRegex = /^(011|012|010|015)\d*$/;
	return mobileRegex.test(value) && value.length == 11;
}

function imageFilter(req, file, cb) {
	const { mimetype } = file;
	if (mimetype.startsWith("image/")) {
		cb(null, true);
		return;
	}
	cb(new Error("Not an image! Please upload an image file."), false);
}
module.exports = {
	checkEmailValidation,
	checkPhoneValidation,
	imageFilter,
};
