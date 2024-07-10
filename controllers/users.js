const User = require("../models/users");
const logger = require("../middlewares/logger"); // Adjust the path as needed
const bcrypt = require("bcrypt");
const saltRounds = 10;

//  const getAllUsers = await User.find({}).exec();


module.exports = {
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find({}).exec();
			res.status(200).send(users);
		} catch (e) {}
	},
	createNewUser:	async (req, res) => {
	try {
		let user = new User(req.body);
		const password = req.body.password;

		bcrypt.hash(password, saltRounds, async function (err, hash) {
			if (err) {
				logger.error(`Error hashing password: ${err.message}`);
				return res.status(500).send({ error: "Error hashing password" });
			}

			user.password = hash;
			try {
				const newUser = await user.save();
				res.status(200).send({ newUser });
			} catch (e) {
				logger.error(`Error saving user: ${e.message}`);
				if (e.name === "ValidationError") {
					const messages = Object.values(e.errors).map((val) => val.message);
					return res.status(400).send({ error: "Validation failed", messages });
				}
				res.status(500).send({ error: "An unexpected error occurred" });
			}
		});
	} catch (e) {
		logger.error(`Unexpected error: ${e.message}`);
		res.status(500).send({ error: "An unexpected error occurred" });
	}
}
}
