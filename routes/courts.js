const express = require("express");
const router = express.Router();
const { getCourtsByCourtLocation, getAllCourts, getCourtByCourtNo, createNewCourt } = require("../controllers/courts");


//#region <Get Requests> //

// get all Courts 
router.get("/", getAllCourts);

// get all Courts by location
router.get("/:location", getCourtsByCourtLocation);

// get  Court by location
router.get("/one/:location", getCourtByCourtNo);

// get Court by court no
router.get("/:court-no", getCourtByCourtNo);


//#endregion


//#region <Post Requests>  //

// create new court
router.post("/new-court",createNewCourt);

//#endregion

module.exports = router;


