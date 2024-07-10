const express = require("express");
const router = express.Router();
const { getAllUsers, createNewUser } = require("../controllers/users");


//#region <Get Requests> //

// get all users 
router.get("/", getAllUsers);
//#endregion


//#region <Post Requests>  //

// create new user
router.post("/signup",createNewUser);

//#endregion

module.exports = router;


