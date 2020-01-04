const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, maxlength: 50, required: true }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = { genreSchema, Genre, validateGenre };
