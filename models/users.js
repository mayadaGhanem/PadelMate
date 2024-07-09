const mongoose = require("mongoose");
const { Schema } = mongoose;
const {checkEmailValidation,checkPhoneValidation}= require('../helpers/validations');


const UserSchema = new Schema(
  {
    user_name: {
      type:Schema.Types.String,
      require:true
    },
  },
  {
    email: {
      type:Schema.Types.String,
      require:true,
      unique:true,
      validate: {
        validator: checkEmailValidation,
        message: props => `${props.value} is not a valid Email`
    },
    },
  },
  {
    password: {
      type:Schema.Types.String,
      require:true
    },
  },
  {
    mobile: {
      type:Schema.Types.Number,
      require:true,
      validate: {
        validator: checkPhoneValidation,
        message: props => `${props.value} is not a valid Phone Number`
    },
    },
  },
  {
    ImageUrl: {
      type:Schema.Types.String,
    },
  },
  {
    gender: {
      type:Schema.Types.String,
      enum : ['MALE','FEMALE','OTHERS'],
      default: 'MALE'
    },
  },
  {
    birthDate:{
      type:Schema.Types.Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema,'users');