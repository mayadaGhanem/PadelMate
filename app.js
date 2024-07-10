require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const matchesRouter = require("./routes/matches");
const courtsRouter = require("./routes/courts");



const uri = process.env.DB_URL;
const router = express.Router();
var app = express();
app.use(bodyParser.json());

mongoose
	.connect(uri)
	.then((res) =>
		// listen to port 3030   +
		{
			// console.log(res,'res÷')
			app.listen(5001);
		}
	)
	.catch((e) => {
		console.log(e);
	});
app.use("/users", usersRouter);
app.use("/matches", matchesRouter);
app.use("/courts", courtsRouter);
router.get("/", function (req, res) {
	res.redirect("/users");
});
