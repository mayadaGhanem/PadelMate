require("dotenv").config();
const User = require("../models/users");
const logger = require("../middlewares/logger"); // Adjust the path as needed
const bcrypt = require("bcrypt");
const path = require("path");
const { imageFilter } = require("../helpers/validations");
const multer = require("multer");
const { storage } = require("../helpers/storage");
const jwt = require("jsonwebtoken");

const upload = multer({
	storage,
	fileFilter: imageFilter,
	limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});
const saltRounds = 10;

module.exports = {
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find({}).exec();
			res.status(200).send(users);
		} catch (e) {}
	},
	createNewUser: async (req, res) => {
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
						return res
							.status(400)
							.send({ error: "Validation failed", messages });
					}
					res.status(500).send({ error: "An unexpected error occurred" });
				}
			});
		} catch (e) {
			logger.error(`Unexpected error: ${e.message}`);
			res.status(500).send({ error: "An unexpected error occurred" });
		}
	},
	uploadAvatar: async (req, res, next) => {
		upload.single("avatar")(req, res, async (err) => {
			if (!req.file) {
				return res.status(400).json({ error: "No file uploaded" });
			}
			if (err instanceof multer.MulterError) {
				return res.status(400).json({ error: err.message });
			} else if (err) {
				return res.status(500).json({ error: err.message });
			}
			try {
				const filePath = req.file.path;
				const user = await User.findOne({ _id: req.userId }).updateOne({
					avatar: filePath,
				});
				res.status(200).send({ message: "File uploaded successfully" });
			} catch (e) {
				res.status(500).send({ error: e.message });
			}
		});
	},
	sendAvatar: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.userId }).exec();
			console.log(user);
			if (!user || !user.avatar) {
				return res
					.status(404)
					.send({ error: "the user or the avatar does not exist" });
			}

			const avatarPath = user.avatar;
			console.log(avatarPath);
			res.sendFile(path.resolve(avatarPath));
		} catch (e) {
			res.status(500).send({ error: "An error occured" });
		}
	},
	signin: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json({ error: "Authentication failed" });
			}
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return res.status(401).json({ error: "Authentication failed" });
			}
			const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
				expiresIn: "24h",
			});
			res.status(200).json({ data: token });
		} catch (error) {
			res.status(500).json({ error: "Login failed" });
		}
	},
};
