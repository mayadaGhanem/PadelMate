require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const matchesRouter = require("./routes/matches");
const courtsRouter = require("./routes/courts");
const uri = process.env.DB_URL;
var app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
// Error handling middleware

mongoose
	.connect(uri)
	.then((res) => {
		app.listen(PORT);
	})
	.catch((e) => {
		console.log(e);
	});
	
app.use("/users", usersRouter);
app.use("/matches", matchesRouter);
app.use("/courts", courtsRouter);
