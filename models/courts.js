const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");


const CourtSchema = new Schema(
	{
		location: {
			type: Schema.Types.String,
			required: true,
		},
		court_no: {
			type: Schema.Types.Number,
			required: true,
			unique: true,
		},
		balls_no: {
			type: Schema.Types.Number,
			required: true,
		},
		rackets_no: {
			type: Schema.Types.Number,
			required: true,
		},
		name: {
			type: Schema.Types.String,
			required: true,
		},
		Opening_dates:{
			type: Schema.Types.Array,
			default: [Date]
		}

	},
	{ timestamps: true }
);
CourtSchema.plugin(uniqueValidator, {
	message:
		"Error, expected {PATH} to be unique. Value: {VALUE} is already in use.",
});

module.exports = mongoose.model("Court", CourtSchema, "courts");
