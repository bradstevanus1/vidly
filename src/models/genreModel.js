const mongoose = require("mongoose");
const Joi = require("joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, minlength: 2, maxlength: 50, required: true }
  })
);

const validateGenre = genre => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  };
  return Joi.validate(genre, schema);
};

module.exports = { Genre, validateGenre };
