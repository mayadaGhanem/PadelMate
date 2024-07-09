require("dotenv").config();
const mongoose = require("mongoose");
const express= require('express');
const router= express.Router();
const bodyParser= require('body-parser');
//var cors = require("cors");
var app = express();
const usersRouter= require('./routes/users');
// app.use(cors);
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;
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
router.get("/", function (req, res) {
	res.redirect("/users");
  });
// var server = app.listen(5001, function () {
// 	console.log("Express App running at http://127.0.0.1:5001/");
// });
