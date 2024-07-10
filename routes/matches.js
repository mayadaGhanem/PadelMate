const express = require("express");
const { createNewMatch, getAllMatches, getMatchesByCourt, getMatchByCourt, getMatchesByDate } = require("../controllers/matches");
const router = express.Router();


//#region <Get Requests> //

// get all matches 
router.get("/", getAllMatches);

// get all matches by court
router.get("/all/:court", getMatchesByCourt);

// get  match by court
router.get("/one/:court", getMatchByCourt);

// get  matches by date
router.get("/:date", getMatchesByDate);


//#endregion


//#region <Post Requests>  //

// create new matches
router.post("/new-match",createNewMatch);

//#endregion

module.exports = router;


