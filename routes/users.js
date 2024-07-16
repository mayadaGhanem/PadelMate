const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const {
	getAllUsers,
	createNewUser,
	uploadAvatar,
	signin,
	sendAvatar,
} = require("../controllers/users");

//#region <Protected route> //

router.get("/", verifyToken, getAllUsers);
router.post("/uploadAvatar", verifyToken, uploadAvatar);
router.get("/getAvatar", verifyToken, sendAvatar);
//#endregion

router.post("/signup", createNewUser);
router.post("/signin", signin);
module.exports = router;
