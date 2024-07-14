const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/auth');

const {
	getAllUsers,
	createNewUser,
	uploadAvatar,
	login,
} = require("../controllers/users");

//#region <Protected route> //

router.get("/", verifyToken,getAllUsers);
router.post("/uploadAvatar",verifyToken, uploadAvatar);

//#endregion

router.post("/signup", createNewUser);
router.post("/login", login);
module.exports = router;
