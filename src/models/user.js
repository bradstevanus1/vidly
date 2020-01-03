const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, maxlength: 50, required: true },
  email: {
    type: String,
    unique: true,
    minlength: 2,
    maxlength: 255,
    validate: {
      validator: v => /\S+@\S+\.\S+/.test(v), // Should have more specific email validation
      message: "Email is formatted incorrectly"
    },
    required: true
  },
  password: { type: String, minlength: 5, maxlength: 1024, required: true }
});

const User = mongoose.model("User", userSchema);

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .email()
      .min(2)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
};

module.exports = { User, validateUser };
