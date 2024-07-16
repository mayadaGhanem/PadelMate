const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const {
	checkEmailValidation,
	checkPhoneValidation,
	checkUserNameValidation,
} = require("../helpers/validations");

const UserSchema = new Schema(
	{
		userName: {
			type: Schema.Types.String,
			unique: true,
			required: true,
		},
		email: {
			type: Schema.Types.String,
			required: true,
			unique: true,
			validate: {
				validator: checkEmailValidation,
				message: (props) => `${props.value} is not a valid Email`,
			},
		},
		password: {
			type: Schema.Types.String,
			required: true,
		},
		phone: {
			type: Schema.Types.String,
			required: true,
			validate: {
				validator: checkPhoneValidation,
				message: (props) => `${props.value} is not a valid Phone Number`,
			},
		},
		avatar: {
			type: Schema.Types.String,
		},
		gender: {
			type: Schema.Types.String,
			enum: ["MALE", "FEMALE", "OTHERS"],
			default: "MALE",
		},
		birthDate: {
			type: Schema.Types.Date,
		},
	},
	{ timestamps: true }
);
UserSchema.plugin(uniqueValidator, {
	message:
		"Error, expected {PATH} to be unique. Value: {VALUE} is already in use.",
});

module.exports = mongoose.model("User", UserSchema, "users");
