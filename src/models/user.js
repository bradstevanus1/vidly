const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
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
}

module.exports = { User, validateUser };
