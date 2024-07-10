const express = require("express");
const router = express.Router();

const {
	getAllUsers,
	createNewUser,
	uploadAvatar,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.post("/signup", createNewUser);
router.post("/uploadAvatar", uploadAvatar);
module.exports = router;
