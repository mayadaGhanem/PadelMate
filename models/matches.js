const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");


const MatchesSchema = new Schema(
	{
		users: [{
			type: Schema.Types.ObjectId,
			ref:'Users',
			required: true,
		}],
		court: {
			type: Schema.Types.ObjectId,
			ref:'Courts',
			required: true,
		},
		duration: {
			hours:Number,
			minutes:Number,
			seconds:Number
		},
		price: {
			type: Schema.Types.Number,
			required: true,
		},
		is_paid: {
			type: Schema.Types.Boolean,
			default:false
		},
		date:{
			type: Schema.Types.Date,
			default: Date.now()
		}

	},
	{ timestamps: true }
);
MatchesSchema.plugin(uniqueValidator, {
	message:
		"Error, expected {PATH} to be unique. Value: {VALUE} is already in use.",
});

module.exports = mongoose.model("Matches", MatchesSchema, "matches");
